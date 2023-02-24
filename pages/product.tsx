import styled from 'styled-components';
import { META_COMMON, META_PAGE } from '@containers/meta';
import SEO from '@components/SEO';
import ProductComponent from '@components/Product';

type TProps = {
  carid: string | null;
};

export default function product({ carid }: TProps) {
  // Variable
  const meta = {
    page_title: META_PAGE.product.page_title,
    page_description: META_COMMON.site_description,
    page_cannonical_link: META_PAGE.product.page_cannonical_link,
    page_image: META_COMMON.site_image,
  };
  return (
    <SEO meta={meta}>
      <ProductComponent carid={carid} />
    </SEO>
  );
}

export const getServerSideProps = async (context: any) => {
  const carid = context.query.carid ? context.query.carid : null;
  return {
    props: {
      carid: carid,
    },
  };
};
