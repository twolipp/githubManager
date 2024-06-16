import React from "react";
import ReactDOM from "react-dom/client";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { App } from "../components/App.jsx";
import "../styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

const httpLink = createHttpLink({
	uri: "https://api.github.com/graphql",
	// uri: "http://localhost:8000/helloRequest/",
});

const authLink = setContext((_, { headers }) => {
	const token = "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";
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>
);
