import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';

import style from './AnimeItem.module.css';

interface Props {

  /** Whether popper is open or not. */
  readonly isOpen: boolean;

  /** DOM of button. */
  readonly anchorEl: HTMLButtonElement | null;

  /** Action when click yes. */
  readonly onAction: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;

  /** Close function. */
  readonly onClose: (event: Event | React.SyntheticEvent) => void;
}

export const AnimePopperDelete: FC<Props> = ({
  isOpen,
  anchorEl,
  onAction,
  onClose,
}) => (
  <Popper
    open={isOpen}
    anchorEl={anchorEl}
    role={undefined}
    placement="bottom-end"
    transition
    sx={{ zIndex: 1 }}
  >
    {({ TransitionProps }) => (
      <Grow {...TransitionProps}>
        <Paper>
          <ClickAwayListener onClickAway={onClose}>
            <Stack className={style['anime-popper__stack-wrapper']}>
              <Typography paddingY={'8px'}>
                Are you sure to delete <br /> this anime?
              </Typography>
              <Stack
                className={style['anime-popper__stack-button']}
                direction="row"
                id="composition-menu"
                aria-labelledby="composition-button"
              >
                <Button
                  variant="contained"
                  className={style['anime-popper__button']}
                  onClick={onAction}
                >
                  Yes
                </Button>
                <Button
                  color='warning'
                  variant="contained"
                  className={style['anime-popper__button']}
                  onClick={onClose}
                >
                  No
                </Button>
              </Stack>
            </Stack>
          </ClickAwayListener>
        </Paper>
      </Grow>
    )}
  </Popper>
);
