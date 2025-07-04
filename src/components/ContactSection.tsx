
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState, useRef } from "react";
import { Mail, Send, Github, Linkedin, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const formRef = useRef();
  const [ status, setStatus ] = useState(null);

  const titleReveal = useScrollReveal();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_cl3q90e",
        "template_k3hhhgz",
        formRef.current,
        "v_cHxCLJSy4WdAddq"
      )
      .then(
        (result) => {
          setStatus("SUCCESS");
        },
        (error) => {
          setStatus("ERROR");
        }
      )
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-16 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          ref={titleReveal.ref as React.RefObject<HTMLDivElement>}
          className={`mb-12 ${titleReveal.isVisible ? "animate-fade-in" : "opacity-0"}`}
          initial={{ opacity: 0, y: 20 }}
          animate={titleReveal.isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-center mt-4">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div 
              className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg text-accent">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a 
                    href="mailto:stamrakar545@gmail.com" 
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    stamrakar545@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg text-accent">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Location</h4>
                  <p className="text-muted-foreground">Kathmandu, Nepal</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
            >
              <h4 className="font-medium mb-3">Social Profiles</h4>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/MythicSTR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-accent/10 hover:bg-accent/20 rounded-lg transition-all text-accent"
                  aria-label="GitHub Profile"
                  whileHover={{ y: -3 }}
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/shishirtamrakar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-accent/10 hover:bg-accent/20 rounded-lg transition-all text-accent"
                  aria-label="LinkedIn Profile"
                  whileHover={{ y: -3 }}
                >
                  <Linkedin size={20} />
                </motion.a>
              </div>
            </motion.div>
          </div>
          
          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-3 bg-card rounded-xl p-6 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
            
            <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none transition-all"
                  placeholder="Your message..."
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-accent w-full flex items-center justify-center gap-2 py-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="animate-spin h-5 w-5 border-2 border-accent-foreground border-t-transparent rounded-full" />
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </motion.button>
              
              {submitSuccess && (
                <motion.div 
                  className="mt-4 p-3 bg-accent/10 text-accent rounded-md"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
