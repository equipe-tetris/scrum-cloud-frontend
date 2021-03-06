import React, {
  useState,
  useCallback,
  useEffect,
  Fragment,
  useRef,
} from 'react'
import {
  Card,
  SvgIcon,
  CardContent,
  CardActions,
  Checkbox,
  Button,
  CssBaseline,
  makeStyles,
  Typography,
  MenuItem,
  IconButton,
  ListItemText,
  Input,
  Menu,
  Autocomplete,
  TextField,
  Switch,
  withStyles,
  Divider,
  Grid,
  Link,
  Tooltip,
  Box,
} from '@mui/material'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useHistory, useParams } from 'react-router-dom'

import { createTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import DoneIcon from '@mui/icons-material/Done'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import MinimizeIcon from '@mui/icons-material/Minimize'
import ListIcon from '@mui/icons-material/List'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SettingsIcon from '@mui/icons-material/Settings'
import ShareIcon from '@mui/icons-material/Share'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import FlagIcon from '@mui/icons-material/Flag' // current history
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import AddTaskIcon from '@mui/icons-material/AddTask';

import { FormatDate } from '../../utils/DateUtil'
import { Colors } from '../../constants/Colors'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Logo from '../../assets/imagens-projeto/logo-scrumcloud-bg.png'
import API from '../../config/api'

import { authService } from '../../services/auth.service'
import { teamService } from '../../services/team.service'
import { planningService } from '../../services/planning.service'
import { SalaPlanning } from '../../models/SalaPlanning'
import { border, width } from '@mui/system'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants'
import { Metrica } from '../../constants/Metrica'
import { useHookWithRefCallback } from '../../utils/useHookWithRefCallback'
import './PlanningPokerRoom.css'
import { taskService } from '../../services/task.service'
import { votacaoService } from '../../services/votacao.service'
import { createTypeReferenceDirectiveResolutionCache } from 'typescript'
import StatusVotacao from '../../components/StatusVotacao/StatusVotacao'
import ValorVoto from '../../components/ValorVotoIntegrante/ValorVoto'
import ChatIcon from '@mui/icons-material/Chat';
import { FormatColorResetRounded } from '@mui/icons-material'
import Modal from '@mui/material/Modal';
import { alertaService } from '../../services/alerta.service'

const MySwal = withReactContent(Swal);

interface InfoTask {
  idTask?: number;
  votosString?: [];
  votosNumber?: [];
  mediaVotosNumericos?: number;
  numVotos?: number;
  moda?: number;
}

interface CurrentVote {
  id?: number;
  conteudo?: string;
  status?: string;
}

const useStyles = {
  root: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center', //horizontalmente
    alignContent: 'center',
  },
  paper: {
    minInicialWidth: '400px',
    minWidth: '400px',
    display: 'inline-block',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#FFFFFF',
    padding: 20,
    zIndex: 1,
  },
  textFields: {},
  inputError: {},
  submit: {},
  ubdr2: { border: '1px solid rgb(204, 0, 0)' },
}

interface InfoTask {
  idTask?: number
  votosString?: []
  votosNumber?: []
  mediaVotosNumericos?: number
  numVotos?: number
  moda?: number
}

interface CurrentVote {
  id?: number
  conteudo?: string
  status?: string
}

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function PlanningPokerRoom() {
  const userLogged = authService.getDataLoggedUser()

  const { id } = useParams<{ id?: string }>()
  const idNumber = Number(id)

  const [QuantidadeHistoria, setQuantidadeHistoria] = React.useState(1)
  const [Historias, setHistorias] = React.useState('')
  const [equipesItemCombo, setEquipesItemCombo] = React.useState([])

  const [SessionList, setSessionList] = React.useState([])

  const [nomeSala, setNomeSala] = React.useState('')
  // const [scrumMaster, setScrumMaster] = React.useState(userLogged.id);
  const [metricaSala, setMetricaSala] = React.useState('')
  const [equipe, setEquipe] = React.useState(0)
  const [checked, setChecked] = React.useState(false)
  const [Vote, setVote] = React.useState('Vota????o em andamento')
  const [ColorVote, setColorVote] = React.useState('#00B81C')
  const [FocusItemStory, setFocusItemStory] = React.useState(true)
  const [FocusItemUsers, setFocusItemUsers] = React.useState(false)
  const [FocusItemShare, setFocusItemShare] = React.useState(false)
  const [FocusItemChat, setFocusItemChat] = React.useState(false)
  const [FocusItemAddNewStory, setFocusItemAddNewStory] = React.useState(false)
  const [TextTooltip, setTextTooltip] = React.useState('Copiar texto')
  const [ClipboardText, setClipboardText] = React.useState(null)
  const [CriptoText, setCriptoText] = React.useState('')
  const [NewStory, setNewStory] = React.useState('')
  const [CurrentClipboardText, setCurrentClipboardText] = React.useState('')
  const [CheckedEndHistory, setCheckedEndHistory] = React.useState(false)
  const [VoteCounter, setVoteCounter] = React.useState(0)
  const chatango = document.createElement('script')
  const [HistoryList, setHistoryList] = React.useState([])
  const [SelectedCard, setSelectedCard] = React.useState<{content?: string, index?: number}>({});

  const [salaPlanning, setSalaPlanning] = useState({})
  const [metrica, setMetrica] = useState('');

  const [CardsList, setCardList] = useState([])
  const [ListTask, setListTask] = useState([])
  const [ListIntegrantes, setListIntegrantes] = useState([])
  const [statusVotacaoTask, setStatusVotacaoTask] = useState([])
  const [infoTask, setInfoTask] = useState<InfoTask>({})
  const [ItemCurrentVote, setItemCurrentVote] = useState<CurrentVote>({})
  const [StatusItemVote, setStatusItemVote] = useState('ABERTA')
  const [NumberVoteTask, setNumberVoteTask] = useState(0)
  const [FinalValueTask, setFinalValueTask] = useState('')
  const [PersistenceFinalValue, setPersistenceFinalValue] = useState('')
  const [ItemIsFinished, setItemIsFineshed] = useState(false)
  const [ItemSelectedByDev, setItemSelectedByDev] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Alert, setAlert] = useState<{id?: number, mensagem?: string, idSala?: number, idUsuario?: number}>({});

  useEffect(() => {
    buscarAlertasPorIdSalaAndIdUser();
  }, [])

  const buscarAlertasPorIdSalaAndIdUser = async() => {
    try {
      const res = await alertaService.buscarAlertasPorIdSalaAndIdUser(idNumber, userLogged?.id);
      setAlert(res.data);
      if(res.data) {
        handleOpen();
      }
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (FocusItemChat === true) {
      handleOpenChat()
    }
  }, [FocusItemChat])

  const handleOpenChat = () => {
    let t = document.getElementById('OW')

    //chatango.classList.replace('ubdr', 'border-color:#20c0c8;')
    chatango.setAttribute('type', 'text/javascript')
    chatango.setAttribute('id', 'cid0020000296958107455')
    chatango.setAttribute('data-cfasync', 'false')
    chatango.setAttribute('async', 'true')
    chatango.setAttribute('src', 'http://st.chatango.com/js/gz/emb.js')
    chatango.setAttribute('style', 'width: 400px;height: 450px;')
    chatango.setAttribute('class', 'RonaldoClass')
    chatango.innerHTML =
      '{"handle":"scrumcloud","arch":"js","styles":{"a":"20c0c8","b":100,"c":"FFFFFF","d":"FFFFFF","k":"20c0c8","m":"CC0000","n":"FFFFFF","p":"10","q":"20c0c8","r":100,"fwtickm":1}}'

    t.appendChild(chatango)
  }


  const history = useHistory()
  let crypto = require('crypto')

  const linkSala = `http://localhost:3000/planningpokerroom/${idNumber}`;

  let gettingData = null;


  const handleChangeEndVote = (event) => {
    if(event.target.checked) {
      MySwal.fire({
        title: <p>Finalizar vota????o deste item? </p>,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'OK'
      }).then((result) => {
        if(result.isConfirmed) {
          setVote('Vota????o finalizada')
          setColorVote('#F70000')
          setChecked(true);
          changeStatusVotacaoItem('FINALIZADO', ItemCurrentVote, true);
    
          buscarInfoTaskPorId(ItemCurrentVote?.id);
            
          getValorFinalTaskPorId(ItemCurrentVote?.id);
            
          setItemIsFineshed(true);
          
        }
      });
      
    } else {
      MySwal.fire({
        title: <p>Colocar este novamente para vota????o? </p>,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'OK'
      }).then((result) => {
        if(result.isConfirmed) {
          setVote('Vota????o em andamento');
          setColorVote('#00B81C');
          setChecked(false);
          changeStatusVotacaoItem('ATUAL', ItemCurrentVote, true);
          setInfoTask(null);

          setPersistenceFinalValue(null);

          setItemIsFineshed(false);

          setTimeout(() => {
            buscarTasksPorIdSala();
          }, 700)
        }
      });
    }
    
  }


  const changeStatusVotacaoItem = async(statusTask: string, currentVote: CurrentVote, permitir: boolean) => {
    const statusTaskToSend = statusTask;
    const idTaskToSend = currentVote?.id;
    const permitirToSend = permitir;

    try {
      const res = await taskService.mudarStatusTaskPorId(statusTaskToSend, idTaskToSend, permitirToSend);
    } catch(e) {
      console.log(e);
    }
  }

 

  const inserirVoto = async(result) => {

    const votoToSend = {
      idTask: ItemCurrentVote?.id,
      idUsuario: userLogged.id,
      valorVoto: result?.content
    }

    try {
      const res = await votacaoService.inserirVoto(votoToSend);

      setStatusVotacaoTask(res.data);
    } catch(e) {
      console.log(e)
    }
  }

  const buscarTasksPorIdSala = async() => {
    try {
      const res = await taskService.buscarTasksPorIdSala(idNumber);

      setListTask(res.data)
    } catch(e) {
      console.log(e)
    }
  }

  const buscarTaskAtualParaVotacaoPorIdSala = async() => {
    try {
      const res = await taskService.buscarTaskAtualParaVotacaoPorIdSala(idNumber);
      setItemCurrentVote(res.data);
    } catch(e) {
      console.log(e)
    }
  }

  const setTypeCards = () => {
    if(metrica === 'PADRAO') {
      setCardList(Metrica.Padrao)
    } else if(metrica === 'FIBONACCI'){
      setCardList(Metrica.Fibonacci)
    } else {
      setCardList(Metrica.Relativa)
    }
      
  }

  const buscarInfoTaskPorId = async(id: number) => {
    try {
      const res = await votacaoService.buscarInfoTaskPorId(id);

      setInfoTask(res.data);
    } catch(e) {
      console.log(e)
    }
  }

  const buscarIntegrantesSalaPorId = async() => {
    try {
      const res = await planningService.buscarIntegrantesEquipePorIdSala(idNumber);

      setListIntegrantes(res.data)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    setTypeCards();
  }, [metrica])

  useEffect(() => {
    buscarDadosSalaPorId();
    buscarIntegrantesSalaPorId();
  }, [])

  useEffect(() => {
    setInterval(() => {
       if(userLogged?.tipoUsuario === 'SM') {
         buscarTasksPorIdSala();
       } else {
         buscarTasksPorIdSala();
         buscarTaskAtualParaVotacaoPorIdSala();
       }
     }, 3000)
   }, [])



  const handleIncrement = () => {
    setVoteCounter(VoteCounter + 1)
  }


  const handleChange = (event) => {
    setVote('Vota????o finalizada')
    setColorVote('#F70000')
    setChecked(true)
  }

  const handleChangeShowEndedStorys = (event) => {
    setCheckedEndHistory(true)
  }

  async function getClipBoard() {
    navigator.clipboard.readText().then((t) => {
      setCurrentClipboardText(t)
    })
  }

  function getCodeSession() {
    let code = crypto.randomBytes(5).toString('hex')
    setCriptoText(code)
  }

  function copySomething() {
    setTextTooltip('Texto copiado')
    try {
      const toCopy = CriptoText
      navigator.clipboard.writeText(toCopy)
      // console.log(id)
    } catch (err) {
      console.error('Failed to copy: ', err)
    } finally {
      getClipBoard()
    }
  }

  const buscarDadosSalaPorId = async() => {
    try {
      const res = await planningService.buscarDadosSalaPorId(idNumber);

      setSalaPlanning(res.data);
      setMetrica(res.data?.metricaSala);
    } catch(e) {
      console.log(e);
    }
  } 



  function handleFocusItem(Case) {
    switch (Case) {
      case 1:
        setFocusItemStory(true)
        setFocusItemUsers(false)
        setFocusItemShare(false)
        setFocusItemChat(false)

        break

      case 2:
        setFocusItemUsers(true)
        setFocusItemStory(false)
        setFocusItemShare(false)
        setFocusItemChat(false)

        break

      case 3:
        setFocusItemShare(true)
        setFocusItemStory(false)
        setFocusItemUsers(false)
        setFocusItemChat(false)

        break
      case 4:
        setFocusItemAddNewStory(true)
        console.log('abri')
        // t.removeChild(chatango);

        break
      case 5:
        console.log('fechei')
        setFocusItemAddNewStory(false)
        // t.removeChild(chatango);
        break
      case 6:
        setFocusItemChat(true)
        setFocusItemShare(false)
        setFocusItemStory(false)
        setFocusItemUsers(false)
        break
    }
  }

  function handleSelectedCard(isc, sc) {
    // let result = Object.create(isc + sc)
    MySwal.fire({
      title: <p>Confirmar seu voto? </p>,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'OK'
    }).then((result) => {
      if(result.isConfirmed) {
        if(sc === '??') {
          sc = '0.5'
        }
        let result = { index: isc, content: sc }
        setSelectedCard(result)

        inserirVoto(result);
      }
    });
  }

  const handleUserKeyPress = useCallback((event) => {
    const { key, keyCode } = event

    let i = document.getElementById('myInput')

    if (keyCode == 13) {
      console.log('Apertei enter')

      setQuantidadeHistoria((prevState) => prevState.valueOf() + 1)
    }

    if (keyCode == 8) {
      console.log('Apertei backspace')
    }
  }, [])


  useEffect(() => {
    Mount()
  }, [])

  useEffect(() => {
    console.log({ TextTooltip, CriptoText, CurrentClipboardText })

    if (CurrentClipboardText !== CriptoText) {
      setTextTooltip('Copiar texto')
    } else {
      setTextTooltip('Texto copiado')
    }
  }, [TextTooltip, CriptoText, CurrentClipboardText])

  useEffect(() => {
    let i = document.getElementById('myInput')

    if (i) i.addEventListener('keydown', handleUserKeyPress)
    return () => {
      if (i) i.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [handleUserKeyPress])

 async function Mount() {
    await Promise.all([getCodeSession(), getClipBoard()])
  }

  const itemClicked = (item: any) => {

    const currentVote: CurrentVote = {
      id: item?.id,
      conteudo: item?.conteudo,
      status: item?.status
    }

    MySwal.fire({
      title: <p>{ userLogged?.tipoUsuario === 'SM' ? 'Mudar item em vota????o?' : 'Mudar item em evid??ncia' }</p>,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'OK'
    }).then((result) => {
      if(result.isConfirmed) {
        setItemCurrentVote(currentVote);
        setItemIsFineshed(false);
        setInicialStateVote(currentVote);
        buscarNumVotosPorIdTask(currentVote?.id);
        changeStatusVotacaoItem('ATUAL', currentVote, false);

        if(currentVote?.status === 'FINALIZADO') {
          setItemSelectedByDev(true);
        } else {
          setItemSelectedByDev(false);
        }
      }
    });
  }

  const setInicialStateVote = (currentVote) => {
    if(currentVote?.status === 'FINALIZADO') {
      setVote('Vota????o finalizada')
      setColorVote('#F70000')
      setChecked(true);
   
      setItemIsFineshed(true);

      setTimeout(() => {
        buscarInfoTaskPorId(currentVote?.id);
        getValorFinalTaskPorId(currentVote?.id);
      }, 300);

    } else {
      setVote('Vota????o em andamento');
      setColorVote('#00B81C');
      setChecked(false);

      setItemIsFineshed(false);
      setPersistenceFinalValue(null);
      setInfoTask(null);
    }
  }

  const buscarNumVotosPorIdTask = async(idCurrentTask: number) => {
    try {
      
      const res = await votacaoService.buscarNumVotosPorIdTask(idCurrentTask);

      setNumberVoteTask(res.data);

    } catch(e) {
      console.log(e)
    }
  }

  const setValorFinalPorIdTask = async() => {

    try {
      const res = await taskService.setValorFinalPorIdTask(ItemCurrentVote?.id, FinalValueTask);

      setFinalValueTask('');

      setTimeout(() => {
        getValorFinalTaskPorId(ItemCurrentVote?.id);
      }, 500)
    } catch(e) {
      console.log(e)
    }
  }

  const getValorFinalTaskPorId = async(idTask: number) => {

    try {
      const res = await taskService.getValorFinalTaskPorId(idTask);
      setPersistenceFinalValue(res.data);
    } catch(e) {
      console.log(e);
    }
  }

  const inserirTask = async() => {

    const taskToSend = {
      listTask: [NewStory]
    }

    MySwal.fire({
      title: <p>Cadastrar novo item para vota????o? </p>,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'OK'
    }).then((result) => {
      if(result.isConfirmed) {
        try {
          const res = taskService.inserirTask(idNumber, taskToSend);
    
          setNewStory('');
        } catch(e) {
          console.log(e);
        }
      }
    });
  }
    
  const deletarTask = (idTask: number) => {
      MySwal.fire({
        title: <p>Deletar este item? </p>,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'OK'
      }).then((result) => {
        if(result.isConfirmed) {
          deletarTaskPorId(idTask);
        }
      });
    }
   
  const deletarTaskPorId = async(idTask: number) => {
      try {
        const res = await taskService.deletarPorId(idTask);
      } catch(e) {
        console.log(e);
      }
  }
    
  
  
  return (
    <div className="container-login">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { Alert?.mensagem }
          </Typography>
        </Box>
      </Modal>
      <CssBaseline />
      <div className=".container-configurationroom-paper">
        <div
          style={{
            flexDirection: 'column',
            minWidth: '80rem',
            display: 'inline-block',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              borderBottom: '2px solid rgba(34,36,38,.15)',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Typography style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
              Sprint planning {FormatDate(undefined, 'DD/MM/YYYY')}
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', flex: 0.22 }}>
              <Typography
                style={{
                  fontWeight: 'bold',
                  marginRight: '2%',
                  fontFamily: 'Segoe UI',
                }}
              >
                { userLogged?.nome }
              </Typography>
            </div>
          </div>
          <Card
            style={{ marginTop: '2%', border: '1px solid'.concat(Colors.Gray) }}
          >
            <div
              style={{
                backgroundColor: ColorVote,
                width: '20%',
                fontFamily: 'Segoe UI',
                margin: '1% 0 1% 0',
                borderTopRightRadius: '5px',
                borderBottomRightRadius: '5px',
              }}
            >
              <p style={{ margin: '1% 0 1% 2%', color: '#ffffff' }}> {Vote}</p>
            </div>

            {
              userLogged.tipoUsuario === 'SM' && ItemCurrentVote?.id ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: '1%',
                  }}
                >
                  <Switch
                    checked={checked}
                    onChange={handleChangeEndVote}
                    color="primary"
                  ></Switch>

                  <Typography
                    style={{ fontFamily: 'Segoe UI', fontWeight: 'bold' }}
                  >
                    Finalizar vota????o deste item
                  </Typography>
                </div>
              ) : (null)
             
            }
            <Grid container spacing={2}>
              <Grid item xs={7} style={{ marginLeft: 0 }}>
                {/* <div style={{ width: '60%' }}> */}
                <Divider
                  style={{
                    width: '97%',
                    fontFamily: 'Segoe UI',
                    margin: '0 0 2% 2%',
                    fontWeight: 'bold',
                  }}
                >
                  Votos
                </Divider>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Card
                    style={{
                      width: '15%',
                      height: '200px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {' '}
                    <img
                      style={{ width: '100px', height: '100px' }}
                      src={'https://i.imgur.com/txEOup1.png'}
                    ></img>
                  </Card>
                  <Card
                    style={{
                      width: '22%',
                      height: '220px',
                      textAlign: 'center',
                      fontFamily: 'Segoe UI',
                      margin: '0 2% 1% 2%',
                      padding: '1%',
                      border: '1px solid #000000',
                    }}
                  >
                    {Object.values(SelectedCard).toString() !== '' ? (
                      <Typography
                        style={{
                          fontFamily: 'Segoe UI',
                          fontWeight: 'bold',
                          fontSize: '14px',
                        }}
                      >
                        {Object.values(SelectedCard).toString().slice(2)
                          .length <= 6
                          ? Object.values(SelectedCard).toString().slice(2)
                          : Object.values(SelectedCard).toString().slice(3)}
                      </Typography>
                    ) : (
                      <Typography style={{ fontSize: '14px' }}>
                        Not selected
                      </Typography>
                    )}

                    <Card
                      style={{
                        marginTop: '160px',
                        fontFamily: 'Segoe UI',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        boxShadow: 'none',
                      }}
                    >
                      {ItemCurrentVote?.conteudo}
                    </Card>
                  </Card>

                  <Card
                    style={{
                      width: '15%',
                      height: '200px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {' '}
                    <img
                      style={{ width: '100px', height: '100px' }}
                      src={'https://i.imgur.com/txEOup1.png'}
                    ></img>
                  </Card>
                </div>

                <Divider
                  style={{
                    width: '100%',
                    fontFamily: 'Segoe UI',
                    margin: '2% 0 0 2%',
                    fontWeight: 'bold',
                  }}
                >
                  {!!checked ? '' : 'Selecione um card'}
                </Divider>

                {!checked && 
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '2% 1% 2% 1%',
                    flexWrap: 'wrap',
                    flex: 0,
                  }}
                >
                  {!!ItemCurrentVote && (
                    CardsList.map((item, index) => (
                      <>
                        <Card
                          onClick={(e) =>
                            handleSelectedCard(index, e.currentTarget.innerText)
                          }
                          style={{
                            display: 'flex',
                            flex: 1,
                            margin: '1% 1% 1% 1%',
                            justifyContent: 'center',
                            border: '1px solid'.concat(Colors.Gray),
                            borderBottom: '1px solid'.concat(Colors.Primary),
                            cursor: 'pointer'
                          }}
                        >
                          <Typography style={{ padding: '5%' }}>
                            {item}
                          </Typography>
                        </Card>
                        {index === 2 && (
                          <div style={{ flexBasis: '100%', height: 0 }}></div>
                        )}
                        {index === 5 && (
                          <div style={{ flexBasis: '100%', height: 0 }}></div>
                        )}
                        {index === 8 && (
                          <div style={{ flexBasis: '100%', height: 0 }}></div>
                        )}
                        {index === 11 && (
                          <div style={{ flexBasis: '100%', height: 0 }}></div>
                        )}
                       
                      </>
                    )))}
                  </div>
                 }
              </Grid>
              <Grid item xs={5}>
                <Grid
                  // container
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: 0,
                    marginLeft: '3%',
                    alignItems: 'center',
                  }}
                >
                  <Grid
                    item
                    xs={3}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <BeenhereIcon style={{ width: '20px', height: '20px' }} />
                      <Typography
                        style={{
                          fontFamily: 'Segoe UI',
                          fontWeight: 'bold',
                          marginLeft: '2%',
                        }}
                      >
                        Votos
                      </Typography>
                      {/* <div style={{ display: 'flex'}}>  </div> */}
                    </div>
                    <Typography
                      style={{
                        fontFamily: 'Segoe UI',
                        fontWeight: 'bold',
                        marginRight: '20%',
                        textAlign: 'center',
                        color: Colors.Green,
                      }}
                    >
                      {NumberVoteTask}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: 'Segoe UI',
                        fontWeight: 'bold',
                        marginLeft: '2%',
                      }}
                    >
                      M??dia
                    </Typography>
                    {
                      infoTask?.mediaVotosNumericos ? (
                        infoTask?.mediaVotosNumericos
                      ) : ( <MinimizeIcon style={{ color: Colors.Red }} /> )
                    } 
                    
                  </Grid>

                  <Grid
                    item
                    xs={3}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      style={{
                        fontFamily: 'Segoe UI',
                        fontWeight: 'bold',
                        marginLeft: '2%',
                      }}
                    >
                      Moda
                    </Typography>
                    {infoTask?.moda ? (
                      infoTask?.moda
                      ) : ( <MinimizeIcon style={{ color: Colors.Orange }} />) 
                     
                    }
                  </Grid>

                  <Grid
                    item
                    xs={3}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    
                    <Typography
                      style={{
                        fontFamily: 'Segoe UI',
                        fontWeight: 'bold',
                        marginLeft: '2%',
                      }}
                    >
                     Valor Final
                    </Typography>
                    { 
                      PersistenceFinalValue ? (
                        PersistenceFinalValue
                      ) : (<MinimizeIcon style={{ color: Colors.Orange }} />)
                    }
                  </Grid>
                </Grid>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: '5% 20px 0 3%',
                    flex: 1,
                  }}
                >
                  <Card
                    onClick={() => handleFocusItem(1)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '33.34%',
                      flexDirection: 'row',
                      padding: '1.5%',
                      boxShadow: 'none',
                      border:
                        !!FocusItemStory &&
                        '1px solid'.concat(Colors.LigthGray),
                      borderBottom: !!FocusItemStory
                        ? 'none'
                        : '1px solid'.concat(Colors.LigthGray),
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  >
                    <ListIcon style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                    <Typography
                      onClick={() => handleFocusItem(1)}
                      style={{
                        fontWeight: 'bold',
                        marginLeft: '5px',
                        fontSize: '13px',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      Hist??rias
                    </Typography>
                  </Card>

                  <Card
                    onClick={() => handleFocusItem(2)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '33.34%',
                      flexDirection: 'row',
                      padding: '1.5%',
                      boxShadow: 'none',
                      border:
                        !!FocusItemUsers &&
                        '1px solid'.concat(Colors.LigthGray),
                      borderBottom: !!FocusItemUsers
                        ? 'none'
                        : '1px solid'.concat(Colors.LigthGray),
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  >
                    <PeopleAltIcon style={{ width: '15px', height: '15px', cursor: 'pointer' }} />
                    <Typography
                      onClick={() => handleFocusItem(2)}
                      style={{
                        fontWeight: 'bold',
                        marginLeft: '2px',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Usu??rios
                    </Typography>
                  </Card>

                  <Card
                    onClick={() => handleFocusItem(3)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '33.34%',
                      flexDirection: 'row',
                      padding: '1.5%',
                      boxShadow: 'none',
                      border:
                        !!FocusItemShare &&
                        '1px solid'.concat(Colors.LigthGray),
                      borderBottom: !!FocusItemShare
                        ? 'none'
                        : '1px solid'.concat(Colors.LigthGray),
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  >
                    <ShareIcon style={{ width: '15px', height: '15px', cursor: 'pointer' }} />
                    <Typography
                      onClick={() => handleFocusItem(3)}
                      style={{
                        fontWeight: 'bold',
                        marginLeft: '5px',
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      Compartilhar
                    </Typography>
                  </Card>

                  <Card
                    onClick={() => handleFocusItem(6)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '33.34%',
                      flexDirection: 'row',
                      padding: '1.5%',
                      boxShadow: 'none',
                      border:
                        !!FocusItemChat && '1px solid'.concat(Colors.LigthGray),
                      borderBottom: !!FocusItemChat
                        ? 'none'
                        : '1px solid'.concat(Colors.LigthGray),
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  >
                    <ChatIcon style={{ width: '15px', height: '15px' }} />
                    <Typography
                      onClick={() => handleFocusItem(6)}
                      style={{
                        fontWeight: 'bold',
                        marginLeft: '5px',
                        fontSize: '13px',
                      }}
                    >
                      Chat
                    </Typography>
                  </Card>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    margin: '0 20px 5% 3%',
                    flex: 1,
                    border: '1px solid'.concat(Colors.LigthGray),
                    borderTop: 'none',
                    padding: '2%',
                  }}
                >
                  {!!FocusItemStory ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {!!(ItemIsFinished && userLogged?.tipoUsuario == "SM") && (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Input
                            placeholder="Defina o valor final deste item"
                            value={FinalValueTask}
                            onChange={(e) => setFinalValueTask(e.target.value)}
                            size="small"
                            style={{
                              fontSize: '14px',
                              fontFamily: 'Segoe UI',
                              width: '50%',
                              height: '20px',
                              border: '1px solid'.concat(Colors.LigthGray),
                              padding: '3%',
                              borderRadius: '5px',
                            }}
                          ></Input>
                          <AddTaskIcon
                            color="primary"
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '10%',
                              cursor: 'pointer'
                            }}
                            onClick={(e) => setValorFinalPorIdTask()}
                          > 
                          <ControlPointIcon
                              style={{ width: '30px', height: '30px' }}
                              // onMouseEnter={() => handleFocusItem(4)} adicionar a lista de historias
                            />
                          </AddTaskIcon> 
                      </div>
                      ) 
                      
                      }

                      {
                      userLogged?.tipoUsuario === 'SM' ? (
                        
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                              <Input
                                placeholder="Nome da hist??ria"
                                value={NewStory}
                                onMouseLeave={() => handleFocusItem(5)}
                                onChange={(e) => setNewStory(e.target.value)}
                                size="small"
                                style={{
                                  fontSize: '14px',
                                  fontFamily: 'Segoe UI',
                                  width: '50%',
                                  height: '20px',
                                  border: '1px solid'.concat(Colors.LigthGray),
                                  padding: '3%',
                                  borderRadius: '5px',
                                }}
                              ></Input>
                              <IconButton
                                color="primary"
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  width: '10%',
                                }}
                                onClick={inserirTask}
                              >
                                <ControlPointIcon
                                  style={{ width: '30px', height: '30px' }}
                                // onMouseEnter={() => handleFocusItem(4)} adicionar a lista de historias
                                />
                              </IconButton>
                        </div>
                      
                      ) : (<></>)
                      } 

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          justifyContent: 'flex-end',
                          margin: '1%',
                        }}
                      >
                        <Switch
                          checked={CheckedEndHistory}
                          onChange={handleChangeShowEndedStorys}
                          color="primary"
                        ></Switch>
                        <Typography
                          style={{
                            fontWeight: 'bold',
                            fontSize: '13px',
                            fontFamily: 'Segoe UI',
                          }}
                        >
                          Mostrar hist??rias finalizadas
                        </Typography>
                      </div>

                      <Card>
                        <div
                          style={{
                            backgroundColor: Colors.LigthGray,
                            padding: '10px',
                          }}
                        >
                          <Grid container spacing={3}>
                            <Grid
                              id="status"
                              item
                              xs={3}
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontSize: '13px',
                                  fontWeight: 'bold',
                                }}
                              >
                                Status
                              </Typography>
                            </Grid>
                            <Grid
                              id="index"
                              item
                              xs={1}
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontSize: '13px',
                                  fontWeight: 'bold',
                                }}
                              >
                                #
                              </Typography>
                            </Grid>
                            <Grid item xs={5}>
                              <Typography
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontSize: '13px',
                                  fontWeight: 'bold',
                                }}
                              >
                                Nome
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontSize: '13px',
                                  fontWeight: 'bold',
                                }}
                              >
                                A????es
                              </Typography>
                            </Grid>
                          </Grid>
                        </div>

                        <Fragment>
                          {
                            ListTask.map((task: any) => (
                              <Grid
                            container
                            spacing={3}
                            style={{ padding: '10px', alignItems: 'center' }}
                              >
                            <Grid
                              id="status"
                              item
                              xs={3}
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              {
                                userLogged?.tipoUsuario == "SM" ? (
                                  
                                  task?.status === 'FINALIZADO' && (
                                    <FlagIcon
                                      style={{ 
                                        color: Colors.LightBlue, 
                                        cursor: 'pointer'
                                      }}
                                      onClick={(evt) => itemClicked(task)}
                                    ></FlagIcon> 
                                  ) || task?.status === 'ATUAL' && (
                                    <FlagIcon
                                      style={{ 
                                        color: Colors.Green, 
                                        cursor: 'pointer'
                                      }}
                                      onClick={(evt) => itemClicked(task)}
                                    ></FlagIcon> 
                                  ) || ( 
                                    <FlagOutlinedIcon 
                                      style={{ cursor: 'pointer' }} 
                                      onClick={(evt) => itemClicked(task)}
                                    /> 
                                  ) 

                                ) : (
                                  task?.status === 'FINALIZADO' && (
                                    <FlagIcon
                                      style={{ 
                                        color: Colors.LightBlue, 
                                        cursor: 'pointer'
                                      }}
                                      onClick={(evt) => itemClicked(task)}
                                    ></FlagIcon> 
                                  ) || task?.status === 'ATUAL' && (
                                    <FlagIcon
                                      style={{ 
                                        color: Colors.Green, 
                                        cursor: 'pointer'
                                      }}
                                      onClick={(evt) => itemClicked(task)}
                                    ></FlagIcon> 
                                  ) || ( <FlagOutlinedIcon style={{ cursor: 'pointer' }} /> ) 
                                )   
                              }
                             
                            </Grid>
                            <Grid
                              id="index"
                              item
                              xs={1}
                              style={{
                                display: 'flex',
                                justifyContent: 'center'
                              }}
                            >
                              <Typography
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontSize: '13px',
                                }}
                              >
                               {task?.id}
                              </Typography>
                            </Grid>
                            <Grid item xs={5}>
                              <Typography
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontSize: '13px',
                                }}
                              >
                               {task?.conteudo}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={3}
                              style={{
                                display: 'flex',
                                justifyContent: 'left',
                              }}
                            >
                              {
                                userLogged?.tipoUsuario === 'SM' ? (
                                  <HighlightOffIcon
                                    style={{ color: Colors.Red, cursor: 'pointer' }}
                                    onClick={(e) => deletarTask(task?.id)}
                                  ></HighlightOffIcon>
                                ) : (<> </>)
                                 
                              } 
                             
                            </Grid>
                          </Grid>
                            ))
                          }
                          
                        </Fragment>
                      </Card>
                    </div>
                  ) : null}

                  {!!FocusItemUsers && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                     <Card>
                        <div
                          style={{
                            backgroundColor: Colors.LigthGray,
                            padding: '10px',
                          }}
                        >
                        
                          <Grid container spacing={3}>
                           
                            <Grid
                              id="index"
                              item
                              xs={1}
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontSize: '13px',
                                  fontWeight: 'bold',
                                }}
                              >
                                #
                              </Typography>
                            </Grid>
                            <Grid item xs={5}>
                              <Typography
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontSize: '13px',
                                  fontWeight: 'bold',
                                }}
                              >
                                Nome
                              </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontSize: '13px',
                                  fontWeight: 'bold',
                                }}
                              >
                                Status de voto
                              </Typography>
                            </Grid>

                            <Grid item xs={3}>
                              <Typography
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontSize: '13px',
                                  fontWeight: 'bold',
                                }}
                              >
                                Valor do voto
                              </Typography>
                            </Grid>
                          </Grid>
                        </div>

                        <Fragment>
                          {
                            ListIntegrantes.map((user: any) => (
                            <Grid
                              container
                              spacing={3}
                              style={{ padding: '10px', alignItems: 'center' }}
                            >
                            
                            <Grid
                              id="index"
                              item
                              xs={1}
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontSize: '13px',
                                }}
                              >
                               {user?.id}
                              </Typography>
                            </Grid>
                            <Grid item xs={5}>
                              <Typography
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontSize: '13px',
                                }}
                              >
                               {user?.nome}
                              </Typography>
                            </Grid>
                            <Grid
                              id="status-voto"
                              item
                              xs={3}
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                              }}
                            >
                              <Typography
                                style={{
                                  fontFamily: 'Segoe UI',
                                  fontSize: '13px',
                                }}
                              >
                                {
                                    ItemCurrentVote?.id ? (
                                      <StatusVotacao 
                                        idTask={ItemCurrentVote?.id}
                                        userId={user?.id} 
                                      />
                                    ) : ( <> </> )
                                  
                                }
                               
                              </Typography>
                            </Grid>

                            <Grid item xs={3}>
                                {
                                  !!ItemIsFinished && (
                                    <ValorVoto
                                      idTask={ItemCurrentVote?.id}
                                      idUser={user?.id}
                                    />
                                  ) 
                                }
                            </Grid>
                          </Grid>
                            ))
                          }
                        </Fragment>
                      </Card>
                    </div>
                  )}

                  {!!FocusItemShare && (
                    <Card
                      style={{
                        display: 'flex',
                        fontFamily: 'Segoe UI',
                        width: '100%',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        boxShadow: 'none',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          width: '35%',
                          padding: '1%',
                          fontFamily: 'Segoe UI',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: Colors.LigthGray,
                        }}
                      >
                        <Typography
                          style={{ fontSize: '13px', fontWeight: 'bold' }}
                        >
                          Compartilhar sess??o
                        </Typography>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          width: '35%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Typography style={{ fontSize: '14px' }}>
                          {linkSala}
                        </Typography>
                      </div>
                      <div
                        onMouseEnter={() => getClipBoard()}
                        style={{
                          display: 'flex',
                          width: '30%',
                          padding: '1%',
                          backgroundColor: Colors.LigthGray,
                          justifyContent: 'center',
                        }}
                      >
                        <Tooltip title={TextTooltip}>
                          <ContentCopyIcon onClick={() => copySomething()} />
                        </Tooltip>
                      </div>
                    </Card>
                  )}

                  {!!FocusItemChat && (
                    <Card
                      style={{
                        display: 'flex',
                        fontFamily: 'Segoe UI',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        boxShadow: 'none',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: '400px',
                          borderColor: '#20c0c8',
                        }}
                        id="OW"
                      >
                        {' '}
                      </div>
                    </Card>
                  )}
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PlanningPokerRoom
