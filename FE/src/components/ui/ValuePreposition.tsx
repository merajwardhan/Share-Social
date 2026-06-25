import { motion } from "motion/react";

export function ValueProposition() {
  return (
    <section className="py-24 md:py-32 relative z-10 w-full bg-transparent border-t border-border/50">
      <div className="container mx-auto px-6 max-w-4xl text-center flex flex-col items-center">
        {/* The Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground mb-8"
        >
          ✨ The LinkList Manifesto
        </motion.div>

        {/* The Catchy Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight mb-8 leading-tight"
        >
          Designed for{" "}
          <span className="font-serif italic font-light text-muted-foreground">
            curators
          </span>
          , <br className="hidden sm:block" />
          built for{" "}
          <span className="font-mono text-primary bg-primary/10 px-2 rounded-md">
            {"{creators}"}
          </span>
          .
        </motion.h2>

        {/* The Body Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto flex flex-col gap-6 leading-relaxed"
        >
          <p>
            LinkList is the quiet corner of the internet where you can stash
            your favorite articles, design inspirations, code snippets, and
            late-night Wikipedia rabbit holes.
          </p>
          <p>
            We aren't trying to reinvent the wheel. We are just building the
            lightning-fast, beautiful bookmark manager you always wished your
            browser had built-in.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
