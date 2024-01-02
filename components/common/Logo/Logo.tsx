import Link from 'next/link';
import LargeLogo from '@/public/images/logo_large.svg';
import SmallLogo from '@/public/images/logo_small.svg';
import Image from 'next/image';

interface Props {
  type: 'main' | 'large' | 'small';
}

function Logo({ type }: Props) {
  return (
    <Link href="/" target="_blank">
      {type === 'main' && <Image alt="홈 바로가기" src="/images/logo_letter.svg" width={121} height={39} />}
      {type === 'large' && <Image alt="홈 바로가기" src="/images/logo_big.svg" width={200} height={200} />}
      {type === 'small' && <Image alt="홈 바로가기" src="/images/logo_icon.svg" width={40} height={40} />}
    </Link>
  );
}

export default Logo;
