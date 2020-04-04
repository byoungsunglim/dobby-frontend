import React from "react";
import ContentLoader from "react-content-loader";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/core";

const override = css`
  margin: auto;
  border-color: black;
`;

export const DocumentLoader = () => {
	return (
		<ContentLoader
			speed={5}
			style={{
				position: "absoulte",
				marginLeft: "10%",
				padding: "5%",
				width: "70%",
				height: "50%",
				display: "inline-block"
			}}
			viewBox="0 0 400 160"
			backgroundColor="lightgrey"
			foregroundColor="white"
		>
			<rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
			<rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
			<rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
			<rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
			<rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
			<circle cx="20" cy="20" r="20" />
		</ContentLoader>
	)
};

export const ImageLoader = () => {
	return (
    <FadeLoader
      css={override}
      size={100}
			color={"gray"}
			loading={true}
    />
  );
}
