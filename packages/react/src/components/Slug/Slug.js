/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { usePrefix } from '../../internal/usePrefix';
import {
  Toggletip,
  ToggletipButton,
  ToggletipContent,
  ToggletipActions,
} from '../Toggletip';

const Slug = React.forwardRef(function Slug(
  {
    aiText = 'AI',
    align,
    autoAlign = false,
    dotType,
    kind,
    size = 'xs',
    slugContent,
  },
  ref
) {
  const prefix = usePrefix();

  const slugClasses = cx({
    [`${prefix}--ai-slug`]: true,
    [`${prefix}--ai-slug--inline-with-content`]:
      kind === 'inline' && slugContent,
  });

  const slugButtonClasses = cx({
    [`${prefix}--ai-slug__button`]: true,
    [`${prefix}--ai-slug__button--${size}`]: size,
    [`${prefix}--ai-slug__button--${kind}`]: kind,
  });

  const aiTextClasses = cx({
    [`${prefix}--ai-slug__text`]: true,
    [`${prefix}--ai-slug__text--dot-${dotType}`]: dotType,
  });

  const isInline = kind === 'inline';

  return (
    <div className={slugClasses} ref={ref}>
      {isInline ? (
        <div className={slugButtonClasses}>
          <span className={aiTextClasses}>{aiText}</span>
          {slugContent && (
            <span className={`${prefix}--ai-slug__content`}>{slugContent}</span>
          )}
        </div>
      ) : (
        <Toggletip align={align} autoAlign={autoAlign}>
          <ToggletipButton
            className={slugButtonClasses}
            label="Show information">
            <span className={`${prefix}--ai-slug__text`}>{aiText}</span>
          </ToggletipButton>
          <ToggletipContent>
            {slugContent}
            <ToggletipActions></ToggletipActions>
          </ToggletipContent>
        </Toggletip>
      )}
    </div>
  );
});

Slug.propTypes = {
  /**
   * Specify the correct translation of the AI text
   */
  aiText: PropTypes.string,

  /**
   * Specify how the popover should align with the button
   */
  align: PropTypes.oneOf([
    'top',
    'top-left',
    'top-right',

    'bottom',
    'bottom-left',
    'bottom-right',

    'left',
    'left-bottom',
    'left-top',

    'right',
    'right-bottom',
    'right-top',
  ]),

  /**
   * Will auto-align the popover on first render if it is not visible. This prop is currently experimental and is subject to future changes.
   */
  autoAlign: PropTypes.bool,

  /**
   * Specify the type of dot that should be rendered in front of the inline variant
   */
  dotType: PropTypes.oneOf(['default', 'hollow']),

  /**
   * Specify the type of Slug, from the following list of types:
   */
  kind: PropTypes.oneOf(['default', 'hollow', 'inline']),

  /**
   * Specify the size of the button, from the following list of sizes:
   */
  size: PropTypes.oneOf(['mini', '2xs', 'xs', 'sm', 'md', 'lg', 'xl']),

  /**
   * Specify the content you want rendered inside the slug ToggleTip
   */
  slugContent: PropTypes.node,
};

export default Slug;
