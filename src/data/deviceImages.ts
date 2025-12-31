import aurora from '@/assets/images/nebula_aurora.png';
import ember from '@/assets/images/nebula_ember.png';
import lunaris from '@/assets/images/nebula_pearl.png';
import voidBlack from '@/assets/images/nebula_void.png';

export type DeviceColorId = 'aurora' | 'void' | 'ember' | 'lunaris';

const toSrcSet = (src: string) => `${src} 1x, ${src} 2x`;

type DeviceImage = {
  src: string;
  srcSet: string;
};

export const deviceImages: Record<DeviceColorId, DeviceImage> = {
  aurora: { src: aurora, srcSet: toSrcSet(aurora) },
  void: { src: voidBlack, srcSet: toSrcSet(voidBlack) },
  ember: { src: ember, srcSet: toSrcSet(ember) },
  lunaris: { src: lunaris, srcSet: toSrcSet(lunaris) }
};
