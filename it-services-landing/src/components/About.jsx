import React from 'react';
import { 
  Award, 
  Users, 
  Clock, 
  Shield, 
  Target, 
  Heart,
  CheckCircle,
  Star
} from 'lucide-react';

const About = () => {
  const achievements = [
    {
      icon: Users,
      number: '500+',
      label: 'Klien Puas',
      description: 'Klien dari berbagai industri'
    },
    {
      icon: Award,
      number: '5+',
      label: 'Tahun Pengalaman',
      description: 'Melayani kebutuhan IT'
    },
    {
      icon: CheckCircle,
      number: '1000+',
      label: 'Project Selesai',
      description: 'Dengan tingkat kepuasan tinggi'
    },
    {
      icon: Clock,
      number: '24/7',
      label: 'Support',
      description: 'Siap membantu kapan saja'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Profesional',
      description: 'Kami berkomitmen memberikan layanan IT dengan standar profesional tertinggi dan solusi yang tepat sasaran.'
    },
    {
      icon: Heart,
      title: 'Terpercaya',
      description: 'Kepercayaan klien adalah prioritas utama. Kami menjaga komitmen dan memberikan hasil terbaik setiap waktu.'
    },
    {
      icon: Shield,
      title: 'Berkualitas',
      description: 'Menggunakan teknologi terdepan dan best practices untuk memastikan kualitas layanan yang superior.'
    }
  ];

  const team = [
    {
      name: 'Ahmad Teknisi',
      role: 'Lead Hardware Specialist',
      experience: '8+ tahun pengalaman',
      speciality: 'Repair & Maintenance'
    },
    {
      name: 'Sari Network',
      role: 'Network Engineer',
      experience: '6+ tahun pengalaman',
      speciality: 'Jaringan & Security'
    },
    {
      name: 'Budi Developer',
      role: 'Full Stack Developer',
      experience: '7+ tahun pengalaman',
      speciality: 'Web & Mobile Apps'
    },
    {
      name: 'Rina Designer',
      role: 'Graphic Designer',
      experience: '5+ tahun pengalaman',
      speciality: 'Visual & Brand Design'
    }
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Tentang <span className="text-primary-600">TechSolution</span>
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Partner terpercaya untuk semua kebutuhan IT Anda. Kami hadir dengan pengalaman bertahun-tahun 
            dan dedikasi tinggi untuk memberikan solusi teknologi terbaik.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div>
            <h3 className="text-3xl font-bold text-secondary-900 mb-6">
              Mengapa Memilih Kami?
            </h3>
            <p className="text-secondary-600 mb-8 leading-relaxed">
              TechSolution adalah perusahaan penyedia layanan IT yang telah berpengalaman lebih dari 5 tahun 
              dalam melayani kebutuhan teknologi informasi untuk bisnis dan personal. Kami memahami bahwa 
              teknologi adalah tulang punggung kesuksesan bisnis modern.
            </p>
            
            <div className="space-y-6 mb-8">
              {values.map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg flex-shrink-0">
                    <value.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-secondary-900 mb-2">{value.title}</h4>
                    <p className="text-secondary-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="btn-primary">
                Konsultasi Gratis
              </a>
              <a href="#services" className="btn-secondary">
                Lihat Layanan
              </a>
            </div>
          </div>

          {/* Right Content - Achievements */}
          <div className="bg-secondary-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-secondary-900 mb-8 text-center">
              Pencapaian Kami
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary-600 rounded-xl mb-4 mx-auto">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {achievement.number}
                  </div>
                  <div className="font-semibold text-secondary-900 mb-1">
                    {achievement.label}
                  </div>
                  <div className="text-sm text-secondary-600">
                    {achievement.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-secondary-900 mb-4">
              Tim Ahli Kami
            </h3>
            <p className="text-secondary-600 max-w-2xl mx-auto">
              Didukung oleh tim profesional berpengalaman yang siap memberikan solusi terbaik 
              untuk setiap kebutuhan teknologi Anda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white border border-secondary-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ')[0][0]}
                  </span>
                </div>
                <h4 className="font-semibold text-secondary-900 mb-1">{member.name}</h4>
                <p className="text-primary-600 font-medium text-sm mb-2">{member.role}</p>
                <p className="text-secondary-600 text-sm mb-2">{member.experience}</p>
                <p className="text-secondary-500 text-xs">{member.speciality}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Preview */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-xl md:text-2xl font-medium mb-6 italic">
            "TechSolution telah membantu bisnis kami berkembang dengan solusi IT yang tepat. 
            Pelayanan profesional dan hasil yang memuaskan!"
          </blockquote>
          <div className="text-primary-100">
            <div className="font-semibold">Pak Hendro</div>
            <div className="text-sm">Owner, CV Maju Jaya</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;