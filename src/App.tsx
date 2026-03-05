import { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Database, 
  Cpu, 
  Settings, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Target, 
  Award,
  ArrowRight,
  Instagram,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function App() {
  const [isDownloading, setIsDownloading] = useState(false);
  // Load Instagram embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape A4
      const slides = document.querySelectorAll('.slide-card');
      
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i] as HTMLElement;
        
        // Temporarily remove animations and transitions for clean capture
        const originalStyle = slide.style.cssText;
        slide.style.transform = 'none';
        slide.style.transition = 'none';
        
        const canvas = await html2canvas(slide, {
          scale: 2, // Higher quality
          useCORS: true,
          logging: false,
          backgroundColor: '#0A0A0A', // Match dark theme if needed
          ignoreElements: (element) => {
            // Ignore Instagram iframes as they often fail to capture or block CORS
            return element.tagName === 'IFRAME';
          }
        });
        
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
        
        // Restore original style
        slide.style.cssText = originalStyle;
      }
      
      pdf.save('Influencee-Proposta-Strategica-2026.pdf');
    } catch (error) {
      console.error('Errore durante la generazione del PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-influencee-light font-sans selection:bg-influencee-secondary/30">
      <main className="pb-32">
        <div className="slide-container">
          
          {/* Slide 1: Title */}
          <motion.section 
            {...fadeIn}
            className="slide-card slide-dark justify-center items-center text-center p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1920&q=80" 
                alt="Hero Dog" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-influencee-dark/80"></div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-influencee-primary rounded-full blur-[120px]"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-influencee-secondary rounded-full blur-[120px]"></div>
            </div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative z-10"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-influencee-primary/20 text-influencee-secondary text-sm font-semibold mb-6 tracking-wider uppercase">
                Proposta Strategica 2026
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Campagna <br />
                <span className="text-influencee-secondary">Pet Influencer</span>
              </h1>
              <p className="text-xl md:text-2xl text-influencee-light/70 max-w-2xl mx-auto mb-12 font-light">
                Microinfluencer Marketing per una crescita autentica e misurabile nel settore Pet.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-influencee-light/40">
                <span className="flex items-center gap-2"><Users size={16} /> Community Driven</span>
                <span className="w-1 h-1 bg-influencee-light/20 rounded-full"></span>
                <span className="flex items-center gap-2"><TrendingUp size={16} /> Data Focused</span>
              </div>
            </motion.div>
          </motion.section>

          {/* Slide 2: Selezione Influencer */}
          <motion.section {...fadeIn} className="slide-card p-12">
            <div className="grid md:grid-cols-2 h-full items-center gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-influencee-dark mb-4">Il Nostro Metodo di <span className="text-influencee-primary">Selezione</span></h2>
                  <p className="text-influencee-dark/60">Non scegliamo solo numeri, ma storie che risuonano con il tuo brand.</p>
                </div>
                
                <div className="space-y-6">
                  {[
                    { title: "Brand Values Match", desc: "Allineamento profondo con i valori e la mission del brand.", icon: <Award className="text-influencee-primary" /> },
                    { title: "KPIs & Follower Audit", desc: "Controllo rigoroso della veracità dei follower e delle performance storiche.", icon: <CheckCircle2 className="text-influencee-primary" /> },
                    { title: "Visual Alignment", desc: "Coerenza estetica con l'identità visiva e il tono di voce del cliente.", icon: <Target className="text-influencee-primary" /> },
                    { title: "Engagement Reale", desc: "Focus assoluto su interazioni autentiche e community attive.", icon: <Users className="text-influencee-primary" /> }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-bold text-influencee-dark">{item.title}</h4>
                        <p className="text-sm text-influencee-dark/60">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80" 
                  alt="Small Dog Selection" 
                  className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-influencee-dark/80 to-transparent flex flex-col justify-end p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2 text-white">Qualità over Quantità</h3>
                  <p className="text-white/80 text-sm">Il 92% dei consumatori si fida più dei micro-influencer che delle celebrità tradizionali.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Slide 3: Database & AI Tools */}
          <motion.section {...fadeIn} className="slide-card slide-dark p-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Database & <span className="text-influencee-secondary">AI-Powered</span> Matching</h2>
              <p className="text-influencee-light/60">Tecnologia all'avanguardia per trovare il match perfetto.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 flex-1">
              <div className="bg-influencee-light/5 border border-white/10 rounded-2xl p-8 flex flex-col">
                <div className="mb-6 text-influencee-secondary"><Database size={32} /></div>
                <h3 className="text-2xl font-bold mb-4">Database Interno</h3>
                <p className="text-influencee-light/70 mb-8">
                  Accesso esclusivo a un network proprietario di oltre <span className="text-white font-bold">6.000 influencer</span> verificati, categorizzati per nicchia, reach e sentiment.
                </p>
              </div>
              
              <div className="bg-influencee-light/5 border border-white/10 rounded-2xl p-8 flex flex-col">
                <div className="mb-6 text-influencee-secondary"><Cpu size={32} /></div>
                <h3 className="text-2xl font-bold mb-4">AI Matching Tools</h3>
                <p className="text-influencee-light/70 mb-8">
                  Algoritmi di intelligenza artificiale per la scansione in tempo reale di <span className="text-white font-bold">Instagram, TikTok e YouTube</span>, identificando trend emergenti e profili ad alto potenziale.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Slide 4: Gestione Progetto */}
          <motion.section {...fadeIn} className="slide-card p-12">
            <h2 className="text-4xl font-bold text-influencee-dark mb-12">Gestione del <span className="text-influencee-primary">Progetto</span></h2>
            
            <div className="space-y-4">
              {[
                { step: "01", title: "Analisi Brief", desc: "Studio approfondito degli obiettivi di business, del target audience e dei competitor." },
                { step: "02", title: "Proposta Creativa Duale", desc: "Sviluppo di due concept strategici distinti, personalizzati sulle necessità specifiche del cliente." },
                { step: "03", title: "Esecuzione & Monitoraggio", desc: "Coordinamento end-to-end della campagna, gestione dei talent e reportistica real-time." }
              ].map((item, i) => (
                <div key={i} className="group flex items-center gap-8 p-6 rounded-2xl hover:bg-influencee-primary/5 transition-colors border border-transparent hover:border-influencee-primary/10">
                  <span className="text-5xl font-bold text-influencee-primary/20 group-hover:text-influencee-primary/40 transition-colors">{item.step}</span>
                  <div>
                    <h4 className="text-xl font-bold text-influencee-dark">{item.title}</h4>
                    <p className="text-influencee-dark/60">{item.desc}</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <Settings className="text-influencee-primary animate-spin-slow" />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Slide 5: Benchmark Settore Pet */}
          <motion.section {...fadeIn} className="slide-card slide-dark p-12">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-2">Benchmark Settore <span className="text-influencee-secondary">Pet</span></h2>
                <p className="text-influencee-light/60">Italia, Proiezioni 2026</p>
              </div>
              <BarChart3 size={48} className="text-influencee-secondary/40" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Engagement Rate", value: "~5%", sub: "2x media generale (2.4%)" },
                { label: "Reach Potenziale", value: "30k-150k", sub: "Per campagna micro (5-15 talent)" },
                { label: "Conversion Rate", value: "2-4%", sub: "Con codici personalizzati" },
                { label: "ROI Atteso", value: "3:1 - 5:1", sub: "Fase test 3 mesi" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/5 text-center">
                  <p className="text-sm text-influencee-light/50 mb-2 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold text-influencee-secondary mb-2">{stat.value}</p>
                  <p className="text-xs text-influencee-light/40 leading-tight">{stat.sub}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 p-6 bg-influencee-secondary/10 rounded-2xl border border-influencee-secondary/20">
              <p className="text-center text-influencee-secondary font-medium italic">
                "Il settore Pet vanta una delle community più attive e passionali sul web, con tassi di interazione record."
              </p>
            </div>
          </motion.section>

          {/* Slide 6: Channel Mix Consigliato */}
          <motion.section {...fadeIn} className="slide-card p-12">
            <h2 className="text-4xl font-bold text-influencee-dark mb-12 text-center">Channel <span className="text-influencee-primary">Mix</span> Consigliato</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-8 rounded-3xl bg-influencee-dark/5 border border-influencee-dark/5 flex flex-col items-center text-center">
                <h4 className="text-xl font-bold mb-4">VIP</h4>
                <p className="text-3xl font-bold text-influencee-dark/40 mb-4">100k+</p>
                <div className="space-y-2 text-sm text-influencee-dark/60">
                  <p>Massimo Reach</p>
                  <p>Brand Awareness</p>
                  <p className="text-red-500/60">Bassa Conversione</p>
                </div>
              </div>
              
              <div className="p-8 rounded-3xl bg-influencee-primary text-white flex flex-col items-center text-center shadow-xl shadow-influencee-primary/20 transform md:scale-105 z-10">
                <div className="absolute top-4 right-4"><CheckCircle2 size={20} /></div>
                <h4 className="text-xl font-bold mb-4">Middle</h4>
                <p className="text-3xl font-bold mb-4">25k - 100k</p>
                <div className="space-y-2 text-sm opacity-90">
                  <p>Ottimo Bilanciamento</p>
                  <p>Credibilità Elevata</p>
                  <p>Buona Conversione</p>
                </div>
              </div>
              
              <div className="p-8 rounded-3xl bg-influencee-secondary text-influencee-dark flex flex-col items-center text-center shadow-xl shadow-influencee-secondary/20 transform md:scale-110 z-20">
                <div className="absolute top-4 right-4 flex gap-1"><CheckCircle2 size={20} /><CheckCircle2 size={20} /></div>
                <h4 className="text-xl font-bold mb-4">Micro</h4>
                <p className="text-3xl font-bold mb-4">5k - 25k</p>
                <div className="space-y-2 text-sm opacity-90">
                  <p>Massima Autenticità</p>
                  <p>Engagement Altissimo</p>
                  <p className="font-bold">Top Conversione</p>
                </div>
              </div>
            </div>
            
            <div className="bg-influencee-dark text-white p-6 rounded-2xl flex items-center justify-between">
              <p className="font-medium">Strategia Consigliata:</p>
              <div className="flex items-center gap-4">
                <span className="px-4 py-1 bg-influencee-secondary text-influencee-dark rounded-full font-bold">80% Micro</span>
                <span className="text-influencee-secondary">+</span>
                <span className="px-4 py-1 bg-influencee-primary text-white rounded-full font-bold">20% Middle</span>
              </div>
            </div>
          </motion.section>

          {/* Slide 7: Modello Pricing Influencer */}
          <motion.section {...fadeIn} className="slide-card slide-dark p-12">
            <h2 className="text-4xl font-bold mb-12">Fattori di <span className="text-influencee-secondary">Pricing</span> Contrattuale</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                {[
                  { title: "Follower Base", desc: "Dimensione e qualità dell'audience (range 5k-100k)." },
                  { title: "Tipologia Contenuto", desc: "Numero di Stories, Reel e Post statici richiesti." },
                  { title: "Brand in Collab", desc: "Visibilità del tag collaborazione ufficiale nel post." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-influencee-secondary/20 flex items-center justify-center shrink-0 text-influencee-secondary font-bold">{i+1}</div>
                    <div>
                      <h4 className="text-lg font-bold">{item.title}</h4>
                      <p className="text-influencee-light/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-8">
                {[
                  { title: "Concessione Contenuto", desc: "Diritti di utilizzo illimitato per i canali del brand." },
                  { title: "Partecipazione Eventi", desc: "Presenza fisica a lanci di prodotto o meeting." },
                  { title: "Esclusività", desc: "Vincoli di non collaborazione con competitor diretti." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-influencee-secondary/20 flex items-center justify-center shrink-0 text-influencee-secondary font-bold">{i+4}</div>
                    <div>
                      <h4 className="text-lg font-bold">{item.title}</h4>
                      <p className="text-influencee-light/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Slide 8, 9, 10: Budget Proposals */}
          <motion.section {...fadeIn} className="slide-card p-12">
            <h2 className="text-4xl font-bold text-influencee-dark mb-12 text-center">Piani di <span className="text-influencee-primary">Investimento</span></h2>
            
            <div className="grid md:grid-cols-3 gap-6 h-full">
              {/* Proposal 1 */}
              <div className="bg-influencee-light border border-influencee-primary/10 rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-xl transition-all">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-influencee-primary/60">Starter</span>
                  <h3 className="text-3xl font-bold text-influencee-dark">€5.000</h3>
                  <p className="text-xs text-influencee-dark/40">Durata: 3 mesi</p>
                </div>
                <div className="space-y-4 mb-8 flex-1 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-influencee-primary" /> 8 Micro-Influencer</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-influencee-primary" /> 1 Reel + 3 Stories cad.</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-influencee-primary" /> Codice sconto personale</div>
                  <div className="pt-4 border-t border-influencee-primary/10">
                    <p className="font-bold text-influencee-dark">Target Reach:</p>
                    <p className="text-xl font-bold text-influencee-primary">60k - 100k</p>
                  </div>
                </div>
              </div>

              {/* Proposal 2 */}
              <div className="bg-influencee-primary rounded-3xl p-8 flex flex-col shadow-xl shadow-influencee-primary/20 transform md:scale-105 z-10 text-white">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-influencee-dark text-influencee-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Più Popolare</div>
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">Growth</span>
                  <h3 className="text-3xl font-bold">€10.000</h3>
                  <p className="text-xs opacity-60">Durata: 3 mesi</p>
                </div>
                <div className="space-y-4 mb-8 flex-1 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} /> 10 Micro + 3 Middle</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} /> 2 Reel + 4 Stories cad.</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} /> Post in collab + Diritti</div>
                  <div className="pt-4 border-t border-white/20">
                    <p className="font-bold">Target Reach:</p>
                    <p className="text-xl font-bold text-influencee-secondary">150k - 250k</p>
                  </div>
                </div>
              </div>

              {/* Proposal 3 */}
              <div className="bg-influencee-dark text-white rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-xl transition-all">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-influencee-secondary">Premium</span>
                  <h3 className="text-3xl font-bold">€15.000</h3>
                  <p className="text-xs opacity-40">Durata: 3 mesi</p>
                </div>
                <div className="space-y-4 mb-8 flex-1 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-influencee-secondary" /> 12 Micro + 5 Middle + 1 VIP</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-influencee-secondary" /> 2 Reel + 5 Stories cad.</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-influencee-secondary" /> Evento launch incluso</div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="font-bold">Target Reach:</p>
                    <p className="text-xl font-bold text-influencee-secondary">250k - 400k</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Slide 11: Profili Target Pet */}
          <motion.section {...fadeIn} className="slide-card p-12">
            <h2 className="text-4xl font-bold text-influencee-dark mb-12">Profili <span className="text-influencee-primary">Target</span> Identificati</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Pet Lovers & Lifestyle", desc: "Proprietari appassionati che condividono la quotidianità con i propri pet in modo estetico e coinvolgente.", tags: ["Lifestyle", "Daily Routine"], img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=400&q=80" },
                { title: "Educatori Cinofili", desc: "Professionisti del settore con altissima autorevolezza e una community che pende dalle loro labbra.", tags: ["Training", "Expertise"], img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80" },
                { title: "Veterinari & Nutrizionisti", desc: "Credibilità scientifica per prodotti che richiedono una validazione tecnica e medica.", tags: ["Health", "Science"], img: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=400&q=80" },
                { title: "Niche Communities", desc: "Focus su specifiche razze (Toy, Mini, Giant) o stili di vita (Outdoor, Urban Pet).", tags: ["Niche", "Specific"], img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=400&q=80" }
              ].map((item, i) => (
                <div key={i} className="group overflow-hidden rounded-2xl bg-influencee-primary/5 border border-influencee-primary/10 flex flex-col">
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-influencee-dark mb-2">{item.title}</h4>
                    <p className="text-sm text-influencee-dark/60 mb-4">{item.desc}</p>
                    <div className="flex gap-2">
                      {item.tags.map((tag, j) => (
                        <span key={j} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-influencee-primary/10 text-influencee-primary rounded-md">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="mt-12 text-center text-xs text-influencee-dark/40 italic">
              * La lista definitiva dei talent verrà selezionata in base alla disponibilità e agli obiettivi specifici della fase di attivazione.
            </p>
          </motion.section>

          {/* Slide 12: Esempi Creativi (Instagram Embeds) */}
          <motion.section {...fadeIn} className="slide-card slide-dark p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Esempi <span className="text-influencee-secondary">Creativi</span> di Riferimento</h2>
              <p className="text-influencee-light/60">Contenuti reali che hanno generato engagement e conversioni.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
              {[
                {
                  url: "https://www.instagram.com/reel/DU8l43AjLP2/",
                  author: "Irene Sofia | Qua la Zampa",
                  label: "Educational / Training"
                },
                {
                  url: "https://www.instagram.com/reel/DTsJoLnCokp/",
                  author: "Federica La Mamma Cinofila®️",
                  label: "Lifestyle / Daily Routine"
                },
                {
                  url: "https://www.instagram.com/reel/DVeEqg5Cpcq/",
                  author: "Dott.ssa Alice Chierichetti",
                  label: "Expert / Veterinary"
                }
              ].map((video, i) => (
                <div key={i} className="flex flex-col h-full">
                  <div className="mb-2 flex items-center justify-between px-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-influencee-secondary bg-influencee-secondary/10 px-2 py-0.5 rounded">{video.label}</span>
                    <Instagram size={14} className="text-influencee-secondary/40" />
                  </div>
                  <div className="instagram-embed-container flex-1 bg-white rounded-2xl border border-white/10 overflow-hidden relative min-h-[580px]">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                      <Instagram size={48} className="text-influencee-dark animate-pulse" />
                    </div>
                    <div className="relative z-10 w-full h-full flex justify-center overflow-hidden">
                      <blockquote 
                        className="instagram-media" 
                        data-instgrm-permalink={`${video.url}?utm_source=ig_embed&amp;utm_campaign=loading`}
                        data-instgrm-version="14"
                        style={{ background:'#FFF', border:0, borderRadius:'3px', boxShadow:'none', margin: '0', maxWidth:'100%', minWidth:'326px', padding:0, width:'100%' }}
                      >
                      </blockquote>
                    </div>
                  </div>
                  <p className="text-xs text-center mt-2 text-influencee-light/40 font-medium">@{video.author}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Slide 14: Thank You */}
          <motion.section 
            {...fadeIn}
            className="slide-card slide-dark justify-center items-center text-center p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=1920&q=80" 
                alt="Happy Dog Thanks" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-influencee-dark/80"></div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-influencee-primary rounded-full blur-[150px]"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-6xl font-bold mb-8">Grazie!</h2>
              <p className="text-2xl text-influencee-secondary mb-12 font-light">Siamo pronti a costruire insieme una campagna di successo.</p>
              
              <div className="flex flex-col items-center gap-8">
                <div className="flex flex-col items-center gap-4">
                  <p className="text-influencee-light/40 text-sm">Rimaniamo a disposizione per domande e approfondimenti.</p>
                  <p className="font-bold text-influencee-secondary">www.influencee.it</p>
                </div>

                <button
                  onClick={downloadPDF}
                  disabled={isDownloading}
                  className="group relative flex items-center gap-3 px-8 py-4 bg-influencee-primary hover:bg-influencee-primary/90 text-white rounded-full font-bold transition-all shadow-lg shadow-influencee-primary/20 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Generazione PDF in corso...
                    </>
                  ) : (
                    <>
                      <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
                      Scarica Presentazione PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-influencee-dark text-influencee-light/40 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-influencee-primary/40 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">I</span>
            </div>
            <span className="font-bold text-influencee-light/80">Influencee</span>
          </div>
          <p className="text-xs">© 2026 Influencee Marketing Agency. Tutti i diritti riservati.</p>
          <div className="flex gap-4 text-xs">
            <span>Privacy Policy</span>
            <span>Termini e Condizioni</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
