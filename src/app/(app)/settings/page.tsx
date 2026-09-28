import type { Metadata } from "next";

import { SettingsTabs } from "./settings-tabs";

export const metadata: Metadata = { title: "Settings · Harbor" };

export default function SettingsPage() {
  return <SettingsTabs />;
}
