import { Tab, Tabs } from '@mui/material';
import classNames from 'classnames';
import { FC, memo, ReactNode, useState } from 'react';

import style from './Tab.module.css';

const a11yProps = (index: number) => ({
  'id': `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

interface TabItem {

  /** Label of tab. */
  readonly label: string;

  /** Panel (content) of tab. */
  readonly panel: ReactNode;
}

interface Props {

  /** List of tabs need to render. */
  readonly listTab: readonly TabItem[];
}

export const TabGroupInner: FC<Props> = ({ listTab }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className={style['tab']}
        aria-label="tab-aria"
      >
        {listTab.map((item, index) => (
          <Tab
            key={index}
            className={style['tab__item']}
            label={item.label}
            {...a11yProps(0)}
          />
        ))}
      </Tabs>
      {listTab.map((item, index) => (
        <div
          role="tabpanel"
          className={classNames(style['tab__panel'])}
          hidden={value !== index}
          key={index}
          id={`tabpanel-${index}`}
          aria-labelledby={`tab-${index}`}
        >
          <>{item.panel}</>
        </div>
      ))}
    </>
  );
};

export const TabGroup = memo(TabGroupInner);
