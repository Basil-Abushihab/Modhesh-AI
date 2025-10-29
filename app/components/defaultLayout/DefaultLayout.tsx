import { Header } from '~/components/header/Header';
import BackgroundRays from '~/components/ui/BackgroundRays';

type DefaultLayoutProps = {
  children?: React.ReactNode;
  showChat?: boolean; // optional toggle for chat display
};

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="flex flex-col h-full w-full bg-bolt-elements-background-depth-1">
      <BackgroundRays />
      <Header />

      {/* Main Page Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">{children}</main>
    </div>
  );
}
