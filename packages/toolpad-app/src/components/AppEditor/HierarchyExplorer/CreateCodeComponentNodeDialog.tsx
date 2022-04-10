import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import * as appDom from '../../../appDom';
import { useDom, useDomApi } from '../../DomLoader';
import { format } from '../../../utils/prettier';
import DialogForm from '../../DialogForm';

function createDefaultCodeComponent(name: string): string {
  const componentId = name.replace(/\s/g, '');
  const propTypeId = `${componentId}Props`;
  return format(`
    import * as React from 'react';
    import type { ComponentConfig } from "@mui/toolpad-core";
    
    export interface ${propTypeId} {
      msg: string;
    }
    
    export const config: ComponentConfig<${propTypeId}> = {
      argTypes: {}
    }
    
    export default function ${componentId}({ msg }: ${propTypeId}) {
      return (
        <div>{msg}</div>
      );
    }

    ${componentId}.defaultProps = {
      msg: "Hello world!",
    };
  `);
}

export interface CreateStudioCodeComponentDialogProps {
  appId: string;
  open: boolean;
  onClose: () => void;
}

export default function CreateStudioCodeComponentDialog({
  appId,
  onClose,
  ...props
}: CreateStudioCodeComponentDialogProps) {
  const dom = useDom();
  const domApi = useDomApi();
  const [name, setName] = React.useState(`MyComponent`);
  const navigate = useNavigate();

  return (
    <Dialog {...props} onClose={onClose}>
      <DialogForm
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          const newNode = appDom.createNode(dom, 'codeComponent', {
            name,
            attributes: {
              code: appDom.createConst(createDefaultCodeComponent(name)),
              argTypes: appDom.createConst({}),
            },
          });
          const appNode = appDom.getApp(dom);
          domApi.addNode(newNode, appNode, 'codeComponents');
          onClose();
          navigate(`/app/${appId}/editor/codeComponents/${newNode.id}`);
        }}
      >
        <DialogTitle>Create a new MUI Studio Code Component</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ my: 1 }}
            autoFocus
            fullWidth
            label="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" variant="text" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={!name}>
            Create
          </Button>
        </DialogActions>
      </DialogForm>
    </Dialog>
  );
}