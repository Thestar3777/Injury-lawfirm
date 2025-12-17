import Layout from "@/components/layout/Layout";
import ButtonLink from "@/components/ui/ButtonLink";

const NotFound = () => {
  return (
    <Layout>
      <section className="section-padding bg-background text-center py-20">
        <div className="container-custom">
          <h1 className="mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <ButtonLink to="/" variant="primary">
            Return to Home
          </ButtonLink>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
