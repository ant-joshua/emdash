import { setupI18n, type Messages } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import * as React from "react";

import { loadMessages } from "@emdash-cms/admin/locales";
import type { PluginBlockDef } from "./editor/PluginBlockNode.js";
import { PluginBlockModal } from "./PortableTextEditor.js";

export function InlinePluginBlockModal({
	block,
	initialValues,
	onClose,
	onInsert,
}: {
	block: PluginBlockDef;
	initialValues: Record<string, unknown>;
	onClose: () => void;
	onInsert: (values: Record<string, unknown>) => void;
}) {
	const locale = document.documentElement.lang || "en";
	const [instance, setInstance] = React.useState<ReturnType<typeof setupI18n> | null>(null);
	React.useEffect(() => {
		let active = true;
		void (async () => {
			const messages: Messages = await loadMessages(locale);
			if (!active) return;
			const i18n = setupI18n();
			i18n.loadAndActivate({ locale, messages });
			setInstance(i18n);
		})();
		return () => {
			active = false;
		};
	}, [locale]);
	if (!instance) return null;
	return (
		<I18nProvider i18n={instance}>
			<PluginBlockModal
				block={block}
				initialValues={initialValues}
				onClose={onClose}
				onInsert={onInsert}
			/>
		</I18nProvider>
	);
}
