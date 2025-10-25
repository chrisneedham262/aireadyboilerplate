import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import type { IncomingMessage } from "http";
import { parse } from "cookie";

export default function App({ Component, pageProps }: AppProps & { access_token: string | null }) {
	return (
		<ThemeProvider>
			<AuthProvider initialAccessToken={pageProps.access_token}>			
				<Component {...pageProps} />
			</AuthProvider>
		</ThemeProvider>
	);
}

export async function getServerSideProps({ req }: { req: IncomingMessage }) {
	const cookies = parse(req.headers.cookie || "");
	const access_token = cookies.access || null;

	return {
		props: {
			access_token,
		},
	};
}
