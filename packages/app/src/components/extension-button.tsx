import React, { FC } from 'react';
import { Box, Text, Flex, PseudoBox, ChevronIcon } from '@blockstack/ui';
import { PoweredBy } from '@blockstack/connect';
import { buildEnterKeyEvent } from '@blockstack/connect/react/components/link';
import { ChromeIcon } from '@components/icons/chrome-icon';
import { FirefoxIcon } from '@components/icons/firefox-icon';

// https://stackoverflow.com/a/13348618
const isChrome = () => {
  const isChromium = window.chrome;
  const winNav = window.navigator;
  const vendorName = winNav.vendor;
  const isOpera = typeof (window as any).opr !== 'undefined';
  const isIEedge = winNav.userAgent.includes('Edge');
  const isIOSChrome = /CriOS/.exec(winNav.userAgent);

  if (isIOSChrome) {
    return false;
  } else if (
    isChromium !== null &&
    typeof isChromium !== 'undefined' &&
    vendorName === 'Google Inc.' &&
    isOpera === false &&
    isIEedge === false
  ) {
    return true;
  } else {
    return false;
  }
};

interface Browser {
  name: 'Chrome' | 'Firefox';
  icon: typeof FirefoxIcon | typeof ChromeIcon;
}

const getBrowser = (): Browser | null => {
  if (isChrome()) {
    return {
      name: 'Chrome',
      icon: ChromeIcon,
    };
  } else if (window.navigator.userAgent.includes('Firefox')) {
    return {
      name: 'Firefox',
      icon: FirefoxIcon,
    };
  }
  return null;
};

export const ExtensionButton: FC = () => {
  const browser = getBrowser();

  if (browser === null) {
    return <PoweredBy />;
  }

  const onClick = () => {
    // TODO: open the extension store page
    console.log('clicked');
  };

  return (
    <Flex
      fontSize={['12px', '14px']}
      justifyContent="center"
      color="ink.600"
      textAlign="center"
      width="100%"
      my="loose"
    >
      <PseudoBox
        textAlign="center"
        onClick={onClick}
        onKeyPress={buildEnterKeyEvent(onClick)}
        textStyle="caption"
        display="flex"
        alignSelf="flex-end"
        tabIndex={0}
        _hover={{
          cursor: 'pointer',
        }}
      >
        <Box backgroundColor="blue.100" borderRadius="16px" py={2} px={4} height="32px">
          <browser.icon display="inline" />
          <Text style={{ position: 'relative', top: '-2px' }} color="blue">
            Get the {browser.name} extension
            <ChevronIcon display="inline" style={{ position: 'relative', top: '-1px' }} />
          </Text>
        </Box>
      </PseudoBox>
    </Flex>
  );
};
