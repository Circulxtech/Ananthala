import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-8 font-cormorant">Terms & Conditions</h1>

          <div className="prose prose-sm max-w-none text-foreground space-y-6">
            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Acceptance of Terms</h2>
              <p className="text-lg leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Use License</h2>
              <p className="text-lg leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on
                Ananthala's website for personal, non-commercial transitory viewing only. This is the grant of a
                license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Disclaimer</h2>
              <p className="text-lg leading-relaxed">
                The materials on Ananthala's website are provided on an 'as is' basis. Ananthala makes no warranties,
                expressed or implied, and hereby disclaims and negates all other warranties including, without
                limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Limitations of Liability</h2>
              <p className="text-lg leading-relaxed">
                In no event shall Ananthala or its suppliers be liable for any damages (including, without limitation,
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                to use the materials on Ananthala's website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Accuracy of Materials</h2>
              <p className="text-lg leading-relaxed">
                The materials appearing on Ananthala's website could include technical, typographical, or photographic
                errors. Ananthala does not warrant that any of the materials on our website are accurate, complete, or
                current. We may make changes to the materials contained on our website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Links</h2>
              <p className="text-lg leading-relaxed">
                Ananthala has not reviewed all of the sites linked to its website and is not responsible for the
                contents of any such linked site. The inclusion of any link does not imply endorsement by Ananthala of
                the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Modifications</h2>
              <p className="text-lg leading-relaxed">
                Ananthala may revise these terms of service for our website at any time without notice. By using this
                website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-cormorant text-foreground mb-4">Governing Law</h2>
              <p className="text-lg leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of India, and you
                irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section className="pt-4 border-t border-border">
              <p className="text-sm text-foreground/70">
                Last Updated:{" "}
                {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
