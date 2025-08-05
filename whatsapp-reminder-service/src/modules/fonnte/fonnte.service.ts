import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { 
  FontteMessageRequest, 
  FontteMessageResponse, 
  FontteApiError,
  FontteDeviceStatus 
} from '../../common/interfaces/fonnte.interface';

@Injectable()
export class FontteService {
  private readonly logger = new Logger(FontteService.name);
  private readonly apiUrl: string;
  private readonly token: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('app.fonnte.apiUrl');
    this.token = this.configService.get<string>('app.fonnte.token');
    
    if (!this.token) {
      this.logger.error('Fonnte token not configured. Please set FONNTE_TOKEN environment variable.');
    }
  }

  /**
   * Send a WhatsApp message using Fonnte API
   */
  async sendMessage(messageData: FontteMessageRequest): Promise<FontteMessageResponse> {
    try {
      this.validateToken();
      
      const url = `${this.apiUrl}/send`;
      const formData = new FormData();
      
      // Convert recipients to string format expected by Fonnte
      const target = Array.isArray(messageData.target) 
        ? messageData.target.join(',') 
        : messageData.target;
      
      formData.append('target', target);
      formData.append('message', messageData.message);
      
      if (messageData.countryCode) {
        formData.append('countryCode', messageData.countryCode);
      }
      
      if (messageData.file) {
        formData.append('file', messageData.file);
      }
      
      if (messageData.delay) {
        formData.append('delay', messageData.delay.toString());
      }
      
      if (messageData.schedule) {
        formData.append('schedule', messageData.schedule);
      }

      const headers = {
        'Authorization': this.token,
        'Content-Type': 'multipart/form-data',
      };

      this.logger.log(`Sending message to: ${target}`);
      
      const response: AxiosResponse<FontteMessageResponse> = await firstValueFrom(
        this.httpService.post(url, formData, { headers })
      );

      if (!response.data.status) {
        throw new HttpException(
          `Fonnte API Error: ${response.data.message}`,
          HttpStatus.BAD_REQUEST
        );
      }

      this.logger.log(`Message sent successfully. ID: ${response.data.id}`);
      return response.data;

    } catch (error) {
      this.logger.error(`Failed to send message: ${error.message}`, error.stack);
      
      if (error instanceof HttpException) {
        throw error;
      }
      
      throw new HttpException(
        `Failed to send WhatsApp message: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Get device status from Fonnte API
   */
  async getDeviceStatus(): Promise<FontteDeviceStatus> {
    try {
      this.validateToken();
      
      const url = `${this.apiUrl}/device`;
      const headers = {
        'Authorization': this.token,
      };

      const response: AxiosResponse<FontteDeviceStatus> = await firstValueFrom(
        this.httpService.get(url, { headers })
      );

      return response.data;

    } catch (error) {
      this.logger.error(`Failed to get device status: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to get device status: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Validate phone number format using Fonnte API
   */
  async validateNumber(phoneNumber: string): Promise<boolean> {
    try {
      this.validateToken();
      
      const url = `${this.apiUrl}/validate`;
      const formData = new FormData();
      formData.append('target', phoneNumber);

      const headers = {
        'Authorization': this.token,
        'Content-Type': 'multipart/form-data',
      };

      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.post(url, formData, { headers })
      );

      return response.data.registered === true;

    } catch (error) {
      this.logger.warn(`Failed to validate number ${phoneNumber}: ${error.message}`);
      return false;
    }
  }

  /**
   * Send message using GET method (alternative endpoint)
   */
  async sendMessageByUrl(target: string, message: string): Promise<FontteMessageResponse> {
    try {
      this.validateToken();
      
      const url = `${this.apiUrl}/send`;
      const params = {
        target,
        message,
        token: this.token,
      };

      const response: AxiosResponse<FontteMessageResponse> = await firstValueFrom(
        this.httpService.get(url, { params })
      );

      if (!response.data.status) {
        throw new HttpException(
          `Fonnte API Error: ${response.data.message}`,
          HttpStatus.BAD_REQUEST
        );
      }

      return response.data;

    } catch (error) {
      this.logger.error(`Failed to send message by URL: ${error.message}`, error.stack);
      throw new HttpException(
        `Failed to send WhatsApp message: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private validateToken(): void {
    if (!this.token) {
      throw new HttpException(
        'Fonnte token not configured. Please set FONNTE_TOKEN environment variable.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}