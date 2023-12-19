import React, { useEffect, useState } from 'react';
import { iSession } from '../../../@types';
import api from '../../../service/api';
import { getSession } from '../../../service/auth';
import AllSessionsDialog from './AllSessionsDialog';

interface iChangeSessionDialog {
  open: boolean;
  handleClose: (session: iSession) => void;
  selectedValue: iSession | null;
}

const ChangeSessionDialog: React.FC<iChangeSessionDialog> = ({
  handleClose,
  open,
  selectedValue,
}) => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    async function getAllSessions() {
      const {
        data: { response },
      } = await api.get(`${getSession()}/show-all-sessions`);
      setSessions(response);
    }

    getAllSessions();
    return () => {
      setSessions([]);
    };
  }, []);

  return (
    <div>
      <AllSessionsDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        sessions={sessions}
      />
    </div>
  );
};

export default ChangeSessionDialog;

