import Layout from "components/layouts/layout";
import HomeHtml from "components/home.page/home-html";
import EnrollSection from 'components/home.page/enroll-section'

export default function HomePage() {
  return (
    <Layout>
      <HomeHtml />
      <EnrollSection />
    </Layout>
  );
}
