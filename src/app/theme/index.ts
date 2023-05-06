import colors from './colors';
import padding from '@app/theme/padding';
import margin from '@app/theme/margin';
import justify from '@app/theme/justify';
import * as sizes from '@app/theme/sizes';
import flexDirection from './flexDirection';
import align from '@app/theme/align';
import flex from '@app/theme/flex';

const theme = {
  ...colors,
  ...padding,
  ...margin,
  ...sizes,
  ...justify,
  ...align,
  ...flexDirection,
  ...flex,
};

export default theme;
