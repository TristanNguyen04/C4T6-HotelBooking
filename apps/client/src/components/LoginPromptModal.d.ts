import React from 'react';
interface LoginPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: () => void;
}
declare const LoginPromptModal: React.FC<LoginPromptModalProps>;
export default LoginPromptModal;
