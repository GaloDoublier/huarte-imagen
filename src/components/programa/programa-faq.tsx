"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cuánto tiempo tengo acceso al programa?",
    answer:
      "Tienes acceso de por vida al contenido del programa. Puedes verlo a tu ritmo, repetir las lecciones las veces que necesites y acceder a todas las actualizaciones futuras sin costo adicional.",
  },
  {
    question: "¿Necesito conocimientos previos de maquillaje o estilismo?",
    answer:
      "No, el programa está diseñado para principiantes. Empezamos desde cero y vamos avanzando paso a paso. Cada módulo incluye explicaciones detalladas y ejemplos prácticos.",
  },
  {
    question: "¿Cómo funcionan las sesiones grupales en vivo?",
    answer:
      "Una vez al mes hacemos una sesión en vivo donde resolvemos dudas, hacemos ejercicios prácticos y compartimos tips actualizados. Si no puedes asistir, la sesión queda grabada para que la veas cuando puedas.",
  },
  {
    question: "¿Qué pasa si no me funciona el programa?",
    answer:
      "Confío plenamente en el contenido del programa. Si después de 7 días no estás satisfecha, te devuelvo el 100% de tu inversión sin preguntas. Tu satisfacción es mi prioridad.",
  },
  {
    question: "¿Puedo hacer preguntas durante el programa?",
    answer:
      "Sí, tienes acceso a nuestra comunidad privada donde puedes hacer preguntas, compartir tu progreso y conectar con otras alumnas. También puedo responderte en las sesiones en vivo.",
  },
  {
    question: "¿Cuánto tiempo necesito dedicar al programa?",
    answer:
      "Recomiendo dedicar entre 2-3 horas semanales para ver el contenido y hacer los ejercicios. Pero al ser autoguiado, puedes adaptarlo a tu ritmo de vida.",
  },
];

export function ProgramaFAQ() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Preguntas Frecuentes
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground text-balance">
            ¿Tienes dudas?
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium text-foreground hover:text-foreground/80">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
