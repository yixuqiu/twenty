import { useEffect } from 'react';
import { Edge, Node } from 'reactflow';
import dagre from '@dagrejs/dagre';
import { useTheme } from '@emotion/react';
import { useRecoilValue } from 'recoil';

import { objectMetadataItemsState } from '@/object-metadata/states/objectMetadataItemsState';
import { isDefined } from '~/utils/isDefined';
import { isUndefinedOrNull } from '~/utils/isUndefinedOrNull';

type SettingsDataModelOverviewEffectProps = {
  setEdges: (edges: Edge[]) => void;
  setNodes: (nodes: Node[]) => void;
};

export const SettingsDataModelOverviewEffect = ({
  setEdges,
  setNodes,
}: SettingsDataModelOverviewEffectProps) => {
  const theme = useTheme();
  const objectMetadataItems = useRecoilValue(objectMetadataItemsState);

  useEffect(() => {
    const items = objectMetadataItems.filter((x) => !x.isSystem);

    const g = new dagre.graphlib.Graph();
    g.setGraph({ rankdir: 'LR' });
    g.setDefaultEdgeLabel(() => ({}));

    const edges: Edge[] = [];
    const nodes = [];
    let i = 0;
    for (const object of items) {
      nodes.push({
        id: object.namePlural,
        width: 220,
        height: 100,
        position: { x: i * 300, y: 0 },
        data: object,
        type: 'object',
      });
      g.setNode(object.namePlural, { width: 220, height: 100 });

      for (const field of object.fields) {
        if (
          isDefined(field.toRelationMetadata) &&
          isDefined(
            items.find(
              (x) => x.id === field.toRelationMetadata?.fromObjectMetadata.id,
            ),
          )
        ) {
          const sourceObj =
            field.relationDefinition?.sourceObjectMetadata.namePlural;
          const targetObj =
            field.relationDefinition?.targetObjectMetadata.namePlural;

          edges.push({
            id: `${sourceObj}-${targetObj}`,
            source: object.namePlural,
            sourceHandle: `${field.id}-right`,
            target: field.toRelationMetadata.fromObjectMetadata.namePlural,
            targetHandle: `${field.toRelationMetadata.fromFieldMetadataId}-left`,
            type: 'smoothstep',
            style: {
              strokeWidth: 1,
              stroke: theme.color.gray,
            },
            markerEnd: 'marker',
            markerStart: 'marker',
            data: {
              sourceField: field.id,
              targetField: field.toRelationMetadata.fromFieldMetadataId,
              relation: field.toRelationMetadata.relationType,
              sourceObject: sourceObj,
              targetObject: targetObj,
            },
          });
          if (!isUndefinedOrNull(sourceObj) && !isUndefinedOrNull(targetObj)) {
            g.setEdge(sourceObj, targetObj);
          }
        }
      }
      i++;
    }

    dagre.layout(g);

    nodes.forEach((node) => {
      const nodeWithPosition = g.node(node.id);
      node.position = {
        // We are shifting the dagre node position (anchor=center center) to the top left
        // so it matches the React Flow node anchor point (top left).
        x: nodeWithPosition.x - node.width / 2,
        y: nodeWithPosition.y - node.height / 2,
      };
    });

    setNodes(nodes);
    setEdges(edges);
  }, [objectMetadataItems, setEdges, setNodes, theme]);

  return <></>;
};
