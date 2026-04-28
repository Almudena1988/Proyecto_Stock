import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export function HelpIcon({ open, handleClose }) {

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Formulario de Contacto</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <form id="subscription-form">
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Dirección de correo electrónico"
                            type="email"
                            sx={{ width: 400, maxWidth: '100%' }}
                            
                            variant="standard"                            
                        />
                        <TextField                            
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Nombre completo"
                            type="text"
                            sx={{ width: 400, maxWidth: '100%' }}
                            variant="standard"                            
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            margin="dense"
                            sx={{ width: 400, maxWidth: '100%' }}
                            label="Comentario"
                            multiline
                            maxRows={4}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" form="subscription-form">Enviar</Button>
                </DialogActions>
            </Dialog>
        </div>
    )



}