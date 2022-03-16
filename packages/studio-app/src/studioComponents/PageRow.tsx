import importedComponentRenderer from './importedComponentRenderer';
import { StudioComponentDefinition } from './studioComponentDefinition';

export default {
  id: 'PageRow',
  displayName: 'PageRow',
  render: importedComponentRenderer('@mui/studio-components', 'PageRow'),
  argTypes: {
    spacing: {
      typeDef: { type: 'number' },
      defaultValue: 2,
    },
    alignItems: {
      typeDef: {
        type: 'string',
        enum: ['start', 'center', 'end', 'stretch', 'baseline'],
      },
      defaultValue: 'start',
    },
    justifyContent: {
      typeDef: {
        type: 'string',
        enum: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'],
      },
      defaultValue: 'start',
    },
    children: {
      typeDef: { type: 'element' },
      control: { type: 'slots' },
    },
  },
} as StudioComponentDefinition;