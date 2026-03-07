export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-4 py-2 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Rachel Coder. All rights reserved.
        </p>
        <p className="mt-2">
          Built with ❤️ using Next.js, Tailwind & creativity.
        </p>
      </div>
    </footer>
  );
}
