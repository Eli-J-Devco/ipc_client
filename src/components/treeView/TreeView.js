import React from "react";
import { useTreeState } from "./useTree";
import styles from "./TreeView.module.scss";
import { ReactComponent as ExpandIcon } from "../../assets/images/chevron-down.svg";
import { ReactComponent as CollapseIcon } from "../../assets/images/chevron-up.svg";

const TreeNode = ({ node }) => {
    const { dispatch } = useTreeState();
    return (
        <div className={styles["tree-node"]}>
            {node.children && (
                <div
                    onClick={() =>
                        dispatch({
                            type: "TOGGLE_NODE",
                            id: node.id,
                            isExpanded: !node.isExpanded
                        })
                    }
                    className={styles["toggle-icon"]}
                >
                    {node.isExpanded ? <CollapseIcon /> : <ExpandIcon />}
                </div>
            )}
            <span>{node.name}</span>
            {node.isExpanded && <TreeView data={node?.children} />}
        </div>
    );
};

const TreeView = ({ data }) => {
    return (
        <div className={styles["tree-view"]}>
            {data?.map((node) => (
                <TreeNode key={node.id} node={node} />
            ))}
        </div>
    );
};

export default TreeView;