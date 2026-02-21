/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, animate } from 'motion/react';
import { 
  Martini, 
  FileText, 
  MessageCircle, 
  Star, 
  HelpCircle, 
  Instagram, 
  Mail,
  Phone,
  Rocket,
  ExternalLink,
  Bike
} from 'lucide-react';
import { Modal } from './components/Modal';
import { LinkButton } from './components/Button';

// Background Animation Component
const Background = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
    <motion.div
      animate={{
        background: [
          'radial-gradient(circle at 0% 0%, #2a0a10 0%, #000000 50%)',
          'radial-gradient(circle at 100% 0%, #1a1030 0%, #000000 50%)',
          'radial-gradient(circle at 100% 100%, #2a0a10 0%, #000000 50%)',
          'radial-gradient(circle at 0% 100%, #1a1030 0%, #000000 50%)',
          'radial-gradient(circle at 0% 0%, #2a0a10 0%, #000000 50%)',
        ],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 opacity-60"
    />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
  </div>
);

// Coin Logo Component with Physics
const CoinLogo = () => {
  const rotation = useMotionValue(0);
  const velocity = useRef(0);
  const isSpinning = useRef(false);

  useAnimationFrame((time, delta) => {
    if (isSpinning.current) {
      // Normalize delta (approx 16ms per frame)
      const deltaFactor = Math.min(delta / 16, 2);
      
      // Apply velocity
      const currentRotation = rotation.get();
      rotation.set(currentRotation + velocity.current * deltaFactor);
      
      // Apply friction (simulating air resistance/gravity)
      velocity.current *= 0.98;

      // Stop condition: when slow enough, snap to nearest face-up position
      if (Math.abs(velocity.current) < 0.5) {
        isSpinning.current = false;
        velocity.current = 0;
        
        // Calculate nearest multiple of 360 (face up)
        const current = rotation.get();
        const target = Math.round(current / 360) * 360;
        
        animate(rotation, target, { 
          type: "spring", 
          stiffness: 100, 
          damping: 15 
        });
      }
    }
  });

  const handleClick = () => {
    isSpinning.current = true;
    // Add angular momentum on each click (accumulates)
    velocity.current += 25;
    // Cap max velocity to prevent visual glitching
    if (velocity.current > 100) velocity.current = 100;
  };

  return (
    <motion.div
      style={{ rotateY: rotation }}
      onClick={handleClick}
      className="w-32 h-32 mb-4 cursor-pointer relative z-10"
      initial={{ rotateY: 0 }}
    >
      <img 
        src="/logo.png" 
        alt="Ghabo Drinks Logo" 
        className="w-full h-full object-contain filter drop-shadow-2xl" 
      />
    </motion.div>
  );
};

export default function App() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [visitorName, setVisitorName] = useState('');
  
  // State for Quote Form
  const [quoteForm, setQuoteForm] = useState({
    eventType: '',
    city: '',
    guests: ''
  });

  // State for Contact Form
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    eventType: '',
    date: ''
  });

  const closeModal = () => {
    setActiveModal(null);
    setShowContactForm(false); // Reset contact form state on close
  };

  const handleQuoteWhatsApp = () => {
    const { eventType, city, guests } = quoteForm;
    const text = `Olá! Gostaria de solicitar um orçamento.

📍 *Informações do Evento:*
*Tipo de Evento:* ${eventType || 'Não informado'}
*Cidade:* ${city || 'Não informada'}
*Número de Convidados:* ${guests || 'Não informado'}

Poderiam me passar uma proposta?`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/554299169018?text=${encoded}`, '_blank');
  };

  const handleContactWhatsApp = () => {
    const { name, eventType, date } = contactForm;
    const text = `Olá! Vim através do site e gostaria de conversar.

👤 *Meus Dados:*
*Nome:* ${name || 'Visitante'}
*Tipo de Evento:* ${eventType || 'Não informado'}
*Data Aproximada:* ${date || 'A definir'}

Aguardo retorno!`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/554299169018?text=${encoded}`, '_blank');
  };

  const handleDevWhatsApp = () => {
    const name = visitorName.trim() || "Visitante";
    const message = encodeURIComponent(`Olá! Meu nome é ${name}. Vi o link da Ghabo Drinks e quero um site igual!`);
    window.open(`https://wa.me/5541988710303?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-white/20">
      <Background />

      <main className="container mx-auto px-4 min-h-[100dvh] flex items-center justify-center py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-sm"
        >
          {/* Main Card */}
          <div className="relative flex flex-col bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
            {/* Decorative Top Gradient */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Profile Section */}
            <div className="relative flex flex-col items-center mb-6 text-center shrink-0">
              <div style={{ perspective: 1000 }}>
                <CoinLogo />
              </div>

              <h1 className="text-3xl font-serif font-bold tracking-tight mb-1 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent animate-text-gradient">
                Ghabo Drinks
              </h1>
              <p className="text-xs text-white/60 uppercase tracking-widest font-medium">
                Drinks & Eventos
              </p>
              <p className="mt-2 text-white/80 font-serif italic text-sm max-w-xs">
                "Trabalho para que seu evento seja leve, organizado e marcante."
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <LinkButton 
                icon={Martini} 
                label="Quem Somos" 
                onClick={() => setActiveModal('about')}
                delay={0.1}
              />
              <LinkButton 
                icon={FileText} 
                label="Solicitar Orçamento" 
                onClick={() => setActiveModal('quote')}
                delay={0.2}
              />
              <LinkButton 
                icon={MessageCircle} 
                label="WhatsApp / Contato" 
                onClick={() => setActiveModal('contact')}
                delay={0.3}
              />
              <LinkButton 
                icon={Instagram} 
                label="Instagram" 
                onClick={() => window.open('https://www.instagram.com/ghabo_drinks_e_eventos/', '_blank')}
                delay={0.4}
              />
              <LinkButton 
                icon={HelpCircle} 
                label="Dúvidas Frequentes" 
                onClick={() => setActiveModal('faq')}
                delay={0.5}
              />
              <LinkButton 
                icon={Bike} 
                label="Ghabo Delivery" 
                onClick={() => setActiveModal('delivery')}
                delay={0.6}
              />
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-white/5 text-center shrink-0">
              <div className="flex justify-center space-x-4 mb-3">
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Instagram size={16} /></a>
                <a href="#" className="text-white/40 hover:text-white transition-colors"><Mail size={16} /></a>
              </div>
              <button 
                onClick={() => setActiveModal('developer')}
                className="text-[10px] font-mono group transition-all duration-300 hover:scale-105"
              >
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-text-gradient font-bold">
                  Desenvolvido por InteligenciArte.IA ✨
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Modals */}
      
      {/* About Modal */}
      <Modal isOpen={activeModal === 'about'} onClose={closeModal} title="Quem Somos">
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="relative h-40 rounded-xl overflow-hidden mb-6 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <span className="text-4xl mb-2">🍸</span>
              <h3 className="text-2xl font-serif font-bold text-white tracking-wide">Ghabo Drinks</h3>
              <p className="text-xs text-white/80 uppercase tracking-widest">Experiências Memoráveis</p>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-xl font-serif italic text-white/90 leading-relaxed">
              "Olá! Tudo bem? Aqui é o Ghabo."
            </p>
            <p className="text-white/70 leading-relaxed font-light">
              Que alegria poder fazer parte do seu evento! Nossa missão é transformar celebrações em <span className="text-white font-medium">experiências inesquecíveis</span> através da coquetelaria de alta qualidade.
            </p>
            <p className="text-white/70 leading-relaxed font-light">
              Trabalho para que seu evento seja leve, organizado e marcante para seus convidados.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            {[
              { title: "Bartenders", subtitle: "Especializados", icon: "👨‍🍳" },
              { title: "Cardápios", subtitle: "Personalizados", icon: "📜" },
              { title: "Estrutura", subtitle: "Completa", icon: "🏗️" },
              { title: "Ingredientes", subtitle: "Premium", icon: "✨" }
            ].map((item, index) => (
              <div key={index} className="p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors text-center group">
                <span className="text-2xl mb-1 block group-hover:scale-110 transition-transform">{item.icon}</span>
                <h4 className="text-white font-serif text-sm font-medium">{item.title}</h4>
                <p className="text-xs text-white/50">{item.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-sm font-serif italic text-white/60">
              "Fico à disposição para montarmos a melhor experiência para você!"
            </p>
          </div>
        </div>
      </Modal>

      {/* Quote Modal */}
      <Modal isOpen={activeModal === 'quote'} onClose={closeModal} title="Orçamento">
        <div className="space-y-6">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-lg font-serif mb-4 flex items-center gap-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              <span className="text-xl">📍</span> Informações do seu evento
            </h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Tipo de evento</label>
                <input 
                  type="text" 
                  value={quoteForm.eventType}
                  onChange={(e) => setQuoteForm({...quoteForm, eventType: e.target.value})}
                  placeholder="Ex: Casamento, Aniversário..." 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-white/40 focus:outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Cidade</label>
                <input 
                  type="text" 
                  value={quoteForm.city}
                  onChange={(e) => setQuoteForm({...quoteForm, city: e.target.value})}
                  placeholder="Sua cidade" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-white/40 focus:outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Número de convidados</label>
                <input 
                  type="number" 
                  value={quoteForm.guests}
                  onChange={(e) => setQuoteForm({...quoteForm, guests: e.target.value})}
                  placeholder="0" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-white/40 focus:outline-none transition-colors" 
                />
              </div>
              <button 
                onClick={handleQuoteWhatsApp}
                className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-white/90 transition-colors mt-2"
              >
                Enviar via WhatsApp
              </button>
            </form>
          </div>

          <div className="space-y-4 text-sm text-white/70">
            <div>
              <h4 className="text-white font-medium mb-1">📌 Como funciona o orçamento</h4>
              <p>O orçamento é personalizado conforme os drinks escolhidos e a quantidade de convidados.</p>
              <p className="mt-2">Para garantir um cálculo mais assertivo, considero a faixa etária de 15 a 50 anos e aplico um desconto médio de 15% do público total (convidados que normalmente não consomem drinks).</p>
              <p className="mt-2 text-white/50 italic">A proposta tem validade de 15 dias.</p>
            </div>
            
            <div className="border-t border-white/10 pt-4">
              <h4 className="text-white font-medium mb-1">⏱ Tempo de atendimento</h4>
              <p>O pacote inicial é de 4 horas de serviço, podendo ser ajustado conforme a necessidade do seu evento.</p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Contact Modal */}
      <Modal isOpen={activeModal === 'contact'} onClose={closeModal} title="Contato">
        <div className="space-y-6 text-center">
          <p className="text-white/80">Entre em contato diretamente conosco para dúvidas rápidas ou agendamentos.</p>
          
          {!showContactForm ? (
            <button 
              onClick={() => setShowContactForm(true)}
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold py-4 rounded-xl hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-900/20"
            >
              <MessageCircle size={24} />
              Conversar no WhatsApp
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-white/5 p-4 rounded-xl border border-white/10 text-left space-y-3"
            >
              <h4 className="text-white font-medium text-center mb-2">Preencha para iniciar a conversa</h4>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Seu Nome</label>
                <input 
                  type="text" 
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  placeholder="Como podemos te chamar?" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-[#25D366] focus:outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Tipo de Evento</label>
                <input 
                  type="text" 
                  value={contactForm.eventType}
                  onChange={(e) => setContactForm({...contactForm, eventType: e.target.value})}
                  placeholder="Ex: Casamento, 15 anos..." 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-[#25D366] focus:outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-1">Data Aproximada (Opcional)</label>
                <input 
                  type="text" 
                  value={contactForm.date}
                  onChange={(e) => setContactForm({...contactForm, date: e.target.value})}
                  placeholder="DD/MM/AAAA" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-2 text-white focus:border-[#25D366] focus:outline-none transition-colors" 
                />
              </div>
              <button 
                onClick={handleContactWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-lg hover:bg-[#20bd5a] transition-colors mt-2"
              >
                <MessageCircle size={20} />
                Enviar Mensagem
              </button>
            </motion.div>
          )}
          
          <div className="flex flex-col gap-3 mt-4">
            <a href="tel:+554299169018" className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
              <Phone size={20} className="text-white/60" />
              <span className="text-white/90">Ligar: (42) 9916-9018</span>
            </a>
            <a href="mailto:contato@ghabodrinks.com" className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/10">
              <Mail size={20} className="text-white/60" />
              <span className="text-white/90">Enviar E-mail</span>
            </a>
          </div>
        </div>
      </Modal>

      {/* FAQ Modal */}
      <Modal isOpen={activeModal === 'faq'} onClose={closeModal} title="Dúvidas Frequentes">
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h4 className="font-medium text-white mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">🍸 Escolha dos drinks</h4>
              <p className="text-sm text-white/70">
                Para um bar equilibrado e bem distribuído durante o evento, recomendo a escolha de 4 a 6 drinks. Encaminharemos o cardápio completo após o contato inicial.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h4 className="font-medium text-white mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">💰 Como é feito o pagamento?</h4>
              <p className="text-sm text-white/70">
                Trabalhamos com 30% de entrada para reserva da data e o restante até a semana do evento. Aceitamos PIX e cartão.
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <h4 className="font-medium text-white mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">📅 Com quanto tempo de antecedência devo reservar?</h4>
              <p className="text-sm text-white/70">
                Recomendamos pelo menos 3 a 6 meses de antecedência para garantir a disponibilidade da data, especialmente para casamentos e formaturas.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Developer Modal */}
      <Modal isOpen={activeModal === 'developer'} onClose={closeModal} title="InteligenciArte.IA">
        <div className="space-y-6 text-center">
          <div className="p-6 bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl border border-purple-500/20">
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-text-gradient">
              Quer um site incrível como esse?
            </h3>
            <p className="text-white/80 mb-6">
              Transforme sua presença digital com um design exclusivo e moderno.
            </p>

            <div className="space-y-4">
              <a 
                href="https://instagram.com/inteligenciarte.ia" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-pink-300 hover:text-pink-200 transition-colors mb-4"
              >
                <Instagram size={20} />
                <span>@inteligenciarte.ia</span>
                <ExternalLink size={14} />
              </a>

              <div className="bg-black/30 p-4 rounded-xl border border-white/10 text-left">
                <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">Seu Nome</label>
                <input 
                  type="text" 
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="Digite seu nome..." 
                  className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500/50 focus:outline-none transition-colors" 
                />
              </div>

              <button 
                onClick={handleDevWhatsApp}
                className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-900/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Rocket size={24} className="group-hover:animate-bounce" />
                <span className="relative">Fale comigo! 🚀</span>
              </button>
              
              <p className="text-xs text-white/40 mt-4">
                Ao clicar, você será redirecionado para o WhatsApp do desenvolvedor.
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Ghabo Delivery Modal */}
      <Modal isOpen={activeModal === 'delivery'} onClose={closeModal} title="Ghabo Delivery">
        <div className="space-y-6 text-center">
          <div className="p-6 bg-gradient-to-br from-red-900/40 to-orange-900/40 rounded-2xl border border-red-500/20">
            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-red-300 via-orange-300 to-red-300 bg-clip-text text-transparent animate-text-gradient">
              Drinks no conforto de casa!
            </h3>
            <p className="text-white/80 mb-6">
              Siga nosso perfil de delivery e peça seus drinks favoritos.
            </p>

            <button 
              onClick={() => window.open('https://www.instagram.com/ghabodelivery/', '_blank')}
              className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-900/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Instagram size={24} />
              <span className="relative">Acessar @ghabodelivery</span>
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}

