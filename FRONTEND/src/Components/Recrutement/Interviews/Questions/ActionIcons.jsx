import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { IconButton } from '@mui/material';
import React from 'react';

const ActionIcons = ({ isEditing, onAdd, onEdit, onDelete, onSave }) => {
  return (
    <div>
      {/* Add Button */}
      <IconButton onClick={onAdd} color="primary" aria-label="add">
        <AddIcon />
      </IconButton>

      {/* Edit/Save Button */}
      <IconButton onClick={isEditing ? onSave : onEdit} color="primary" aria-label="edit">
        {isEditing ? <SaveIcon /> : <EditIcon />}
      </IconButton>

      {/* Delete Button */}
      <IconButton onClick={onDelete} color="primary" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default ActionIcons;
