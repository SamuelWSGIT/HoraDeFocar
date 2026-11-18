import { HeaderFokus } from './components/HeaderFokus';
import { MainContent } from './components/MainContent';
import { PageLayout } from './layouts/PageLayout';
import { SiteFooter } from './components/SiteFooter';

function App() {
  return (
    <PageLayout>
      <HeaderFokus />
      <MainContent />
      <SiteFooter />
    </PageLayout>
  );
}

export default App;
