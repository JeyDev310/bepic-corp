import Layout from "components/layouts/layout";
import AboutHtml from "components/about.page/about-html";
import EnrollSection from 'components/home.page/enroll-section'

export default function AboutPage() {
  return (
    <Layout pageTitle='About Us'>
      <AboutHtml />
      <EnrollSection />
    </Layout>
  );
}
