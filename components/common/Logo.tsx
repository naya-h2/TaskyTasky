import Link from 'next/link';
import MainLogo from '@/public/images/logo_main.svg';
import LargeLogo from '@/public/images/logo_large.svg';
import SmallLogo from '@/public/images/logo_small.svg';

interface Props {
  type: 'main' | 'large' | 'small';
}

function Logo({ type }: Props) {
  return (
    <>
      <Link href="/" target="_blank">
        {type === 'main' && <MainLogo />}
        {type === 'large' && <LargeLogo />}
        {type === 'small' && <SmallLogo />}
      </Link>
    </>
  );
}

export default Logo;
