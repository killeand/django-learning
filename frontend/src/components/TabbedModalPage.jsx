import ModalPage from "./ModalPage";
import { Tabs, Tab, TabList, TabPanel } from '@mui/joy';
import React from 'react';

export default function TabbedModalPage({ color, title, icon, path, children, ...props }) {
    return (
        <ModalPage color={color} title={title} icon={icon} path={path}>{({color, onClose}) => {
            return (
                <Tabs>
                    <TabList>
                        {children.map((child, index) => <Tab key={`tabtitle-${index}`} value={index}>{child.props.title || "New Child"}</Tab>)}
                    </TabList>
                    {children.map((child, subindex) => {
                        return (
                            <TabPanel key={`tabpanel-${subindex}`} value={subindex}>
                                {React.cloneElement(child, {color:color, onClose:onClose})}
                            </TabPanel>
                        );
                    })}
                </Tabs>
            );
        }}
        </ModalPage>
    );
}