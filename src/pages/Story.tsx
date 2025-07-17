import { motion } from "framer-motion";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { usePersonalData } from "@/hooks/usePersonalData";

const Story = () => {
  const personalData = usePersonalData();

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-background via-background to-muted/30 py-20">
            <div className="container max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
                  My Journey
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  A visual story of adventures, achievements, and meaningful experiences that have shaped my path.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Story Timeline */}
          <section className="py-20 bg-muted/20">
            <div className="container max-w-6xl mx-auto">
              <div className="space-y-20">
                {personalData.story.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`flex flex-col lg:flex-row items-center gap-12 ${
                      item.image ? `${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}` : 'lg:items-center lg:justify-center'
                    }`}
                  >
                    {/* Image Section */}
                    {item.image && (<div className="flex-1 lg:max-w-lg">
                      <div className="relative group">
                        <div className="aspect-[4/3] bg-gradient-to-br from-accent/20 via-accent/10 to-accent/5 rounded-2xl overflow-hidden shadow-xl">
                          {/* Stock image for demonstration */}
                          <img 
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-sm font-medium">{item.date}</p>
                          </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent/30 rounded-full animate-pulse" />
                        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                      </div>
                    </div>
                    )}

                    {/* Content Section */}
                    <div className={`flex-1 space-y-6 ${!item.image ? 'text-center' : ''}`}>
                      <div className="space-y-4">
                        
                        <h2 className="text-3xl font-bold text-foreground">
                          {item.title}
                        </h2>

                        <div className={`flex gap-3 ${item.image ? 'items-center' : 'justify-center'}`}>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{item.date}</span>
                          </div>
                          <Badge 
                            variant="secondary" 
                            className="bg-accent/10 text-accent border-accent/20"
                          >
                            {item.type}
                          </Badge>
                        </div>
                        
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Highlights as visual cards */}
                      <div className="grid gap-3">
                        {item.highlights.map((highlight, highlightIndex) => (
                          <Card key={highlightIndex} className="p-4 bg-background/50 border-l-4 border-l-accent">
                            <p className="text-sm text-muted-foreground flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                              {highlight}
                            </p>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* End decoration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center mt-20"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 italic">The journey continues...</p>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Story;