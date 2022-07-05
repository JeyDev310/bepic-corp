import Link from "next/link";
import Layout from "components/layouts/layout";

export default function MoneyGuaranteePage(props) {
  return (
    <Layout>
      <div className="container pt-4 pb-2 mobile-m-t-n100">
        <div className="text-center">
          <h1>
            <span>B-Epic Guarantee</span>
          </h1>
        </div>
        <div className="">
          <p className="lead p-t-50">
            B-Epic products have been enhancing people’s lives around the world.
            We invite you to try them for yourself backed by our B-Epic 30-Day
            Money Back Guarantee.{" "}
          </p>
          <p className="lead">
            You’re going to love your results! But if for any reason you are
            unhappy with a product, you can return it within 30 days for a
            refund. To ensure your refund is processed quickly, be sure to
            follow the instructions for the{" "}
            <Link href="/termsconditions#returnsandrefunds">
              B-Epic Refund Policy.
            </Link>
          </p>

          <p className="lead">
            The Money-Back Guarantee is available only on regular size, single
            unit product purchases. Sample size, product packs (e.g., Epic Pack
            and Epic Pack Plus), multi-unit purchases (e.g., Buy 2 Get 1 Free),
            Promos, and Limited Time Offers (LTOs) do not qualify.
          </p>
          <p className="lead">
            Refunds are given based on the original purchase price. Be advised,
            there is a 25% restocking fee of the original purchase price for any
            product refund. Shipping and handling charges are non-refundable.
          </p>

          <p className="lead">
            For more information, please contact{" "}
            <Link href="/support">B-Epic Member Support.</Link>{" "}
          </p>
        </div>
      </div>
    </Layout>
  );
}
