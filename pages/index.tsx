import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/pages/home/Layout';
import Button from '@/components/common/Button';
import landing1 from '@/public/images/resource/desktop/landging1.png';
import landing2 from '@/public/images/resource/desktop/landging2.png';
import landing3 from '@/public/images/resource/desktop/landging3.png';
import landing4 from '@/public/images/resource/desktop/landging4.png';
import landing5 from '@/public/images/resource/desktop/landging5.png';
import { BLACK, WHITE, GRAY, VIOLET } from '@/styles/ColorStyles';
import { FONT_16, FONT_18, FONT_18_B, FONT_22, FONT_28_B } from '@/styles/FontStyles';
import { DEVICE_SIZE } from '@/styles/DeviceSize';
import PointSection from '@/components/pages/home/PointSection';
import MainIntro from '@/components/pages/home/MainIntro';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import MiniSection from '@/components/pages/home/MiniSection';

function Home() {
  const router = useRouter();

  useEffect(() => {
    if (window && window.localStorage.getItem('login')) router.push('/myboard');
  }, []);

  return (
    <Layout>
      <Container>
        <MainIntro />
        <PointSection />
        <MiniSection />
      </Container>
    </Layout>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 120px auto 0;
  padding: 0 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 60px;

  @media (max-width: ${DEVICE_SIZE.tablet}) {
    margin-top: 100px;
  }
`;
