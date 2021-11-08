import React, { useState, useCallback, useEffect, Fragment } from 'react'
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

import './PlanningPokerRoom.css'
import { FormatDate } from '../../utils/DateUtil'
import { Colors } from '../../constants/Colors'

import Logo from '../../assets/imagens-projeto/logo-scrumcloud-bg.png'
import API from '../../config/api'

import { authService } from '../../services/auth.service'
import { teamService } from '../../services/team.service'
import { planningService } from '../../services/planning.service'
import { SalaPlanning } from '../../models/SalaPlanning'
import { border, width } from '@mui/system'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants'
import { Metrica } from '../../constants/Metrica'
import { taskService } from '../../services/task.service'
import { votacaoService } from '../../services/votacao.service'
import { createTypeReferenceDirectiveResolutionCache } from 'typescript'
import StatusVotacao from '../../components/StatusVotacao/StatusVotacao'


interface InfoTask {
  idTask?: number;
  votosString?: [];
  votosNumber?: [];
  mediaVotosNumericos?: number;
  numVotos?: number;
  moda?: number;
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
}

function PlanningPokerRoom() {
  const userLogged = authService.getDataLoggedUser()

  const { id } = useParams<{id?: string}>();
  const idNumber = Number(id);

  const [QuantidadeHistoria, setQuantidadeHistoria] = React.useState(1)
  const [Historias, setHistorias] = React.useState('')
  const [equipesItemCombo, setEquipesItemCombo] = React.useState([])

  const [SessionList, setSessionList] = React.useState([])

  const [nomeSala, setNomeSala] = React.useState('')
  // const [scrumMaster, setScrumMaster] = React.useState(userLogged.id);
  const [metricaSala, setMetricaSala] = React.useState('')
  const [equipe, setEquipe] = React.useState(0)
  const [checked, setChecked] = React.useState(false)
  const [Vote, setVote] = React.useState('Votação em andamento')
  const [ColorVote, setColorVote] = React.useState('#00B81C')
  const [FocusItemStory, setFocusItemStory] = React.useState(true)
  const [FocusItemUsers, setFocusItemUsers] = React.useState(false)
  const [FocusItemShare, setFocusItemShare] = React.useState(false)
  const [FocusItemAddNewStory, setFocusItemAddNewStory] = React.useState(false)
  const [TextTooltip, setTextTooltip] = React.useState('Copiar texto')
  const [ClipboardText, setClipboardText] = React.useState(null)
  const [CriptoText, setCriptoText] = React.useState('')
  const [NewStory, setNewStory] = React.useState('')
  const [CurrentClipboardText, setCurrentClipboardText] = React.useState('')
  const [CheckedEndHistory, setCheckedEndHistory] = React.useState(false)
  const [HistoryList, setHistoryList] = React.useState([])
  const [SelectedCard, setSelectedCard] = React.useState<{content?: string, index?: number}>({});
  const [salaPlanning, setSalaPlanning] = useState({});
  const [metrica, setMetrica] = useState('');
  const [CardsList, setCardList] = useState([]);
  const [ListTask, setListTask] = useState([]);
  const [ListIntegrantes, setListIntegrantes] = useState([]);
  const [statusVotacaoTask, setStatusVotacaoTask] = useState([]);
  const [infoTask, setInfoTask] = useState<InfoTask>({});

  const history = useHistory()
  let crypto = require('crypto')

  //opções que virão da api de acordo com a técnica aplicada na criação da sala
  //let CardsList = []


  //cards selecionados pelos participantes da sala
  const CardSelect = [
    { index: 0, name: 'Card 1' },
    { index: 1, name: 'Card 2' },
    { index: 2, name: 'Card 3' },
  ]


  const handleChange = (event) => {
    setVote('Votação finalizada')
    setColorVote('#F70000')
    setChecked(true);

    inserirVoto();
    buscarInfoTaskPorId();
  }

  const inserirVoto = async() => {

    const votoToSend = {
      idTask: 1,
      idUsuario: userLogged.id,
      valorVoto: SelectedCard?.content.toLowerCase()
    }

    try {
      const res = await votacaoService.inserirVoto(votoToSend);

      setStatusVotacaoTask(res.data);
    } catch(e) {
      console.log(e)
    }
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

  const buscarTasksPorIdSala = async() => {
    try {
      const res = await taskService.buscarTasksPorIdSala(idNumber);

      setListTask(res.data)
    } catch(e) {
      console.log(e)
    }
  }

  const setTypeCards = () => {
    if(metrica == 'PADRAO') {
      setCardList(Metrica.Padrao)
    } else if(metrica == 'FIBONACCI'){
      setCardList(Metrica.Fibonacci)
    } else {
      setCardList(Metrica.Relativa)
    }
      
  }

  const buscarInfoTaskPorId = async() => {
    try {
      const res = await votacaoService.buscarInfoTaskPorId(1);

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
    buscarInfoTaskPorId();
  }, [SelectedCard])

  useEffect(() => {
    setTypeCards();
  }, [metrica])

  useEffect(() => {
    buscarDadosSalaPorId();
    buscarTasksPorIdSala();
    buscarIntegrantesSalaPorId();
  }, [])

  function handleFocusItem(Case) {
    switch (Case) {
      case 1:
        setFocusItemStory(true)
        setFocusItemUsers(false)
        setFocusItemShare(false)
        break

      case 2:
        setFocusItemUsers(true)
        setFocusItemStory(false)
        setFocusItemShare(false)
        break

      case 3:
        setFocusItemShare(true)
        setFocusItemStory(false)
        setFocusItemUsers(false)
        break
      case 4:
        setFocusItemAddNewStory(true)
        console.log('abri')
        break
      case 5:
        console.log('fechei')
        setFocusItemAddNewStory(false)
        break
    }
  }

  function handleSelectedCard(isc, sc) {
    // let result = Object.create(isc + sc)
    let result = { index: isc, content: sc }
    setSelectedCard(result)
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

  useEffect(() => {
    console.log(SelectedCard)
  }, [SelectedCard])

  // function ConverterCards() {
  //   console.log(SessionList)
  //   if (!!Historias && Historias.length > 0) {
  //     let a = Historias.split(/\r\n|\r|\n/)
  //     setSessionList(a)
  //   }
  // }

 async function Mount() {
    await Promise.all([getCodeSession(), getClipBoard()])
  }

  return (
    <div className="container-login">
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
                onChange={handleChange}
                color="primary"
              ></Switch>

              <Typography
                style={{ fontFamily: 'Segoe UI', fontWeight: 'bold' }}
              >
                Finalização de voto
              </Typography>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={7} style={{ marginLeft: 0 }}>
                {/* <div style={{ width: '60%' }}> */}
                <Divider
                  style={{
                    width: '100%',
                    fontFamily: 'Segoe UI',
                    margin: '0 0 2% 2%',
                    fontWeight: 'bold',
                  }}
                >
                  Votos
                </Divider>
                <Card
                  style={{
                    width: '20%',
                    textAlign: 'center',
                    fontFamily: 'Segoe UI',
                    margin: '0 0 1% 2%',
                    padding: '1%',
                    height: '200px',
                    border: '1px solid #000000',
                  }}
                >
                  {Object.values(SelectedCard).toString().slice(2).length <= 6
                    ? Object.values(SelectedCard).toString().slice(2)
                    : Object.values(SelectedCard).toString().slice(3)}
                  <Card
                    style={{
                      marginTop: '70%',
                      fontFamily: 'Segoe UI',
                      fontWeight: 'bold',
                    }}
                  >
                    task1
                  </Card>
                </Card>
                <Divider
                  style={{
                    width: '100%',
                    fontFamily: 'Segoe UI',
                    margin: '2% 0 0 2%',
                    fontWeight: 'bold',
                  }}
                >
                  {!!checked ? '' : 'Selecione um card' }
                  
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
                  {
                  CardsList.map((item, index) => (
                    <>
                      <Card
                        onClick={(e) =>
                          handleSelectedCard(index, e.currentTarget.innerText)
                        }
                        style={{
                          display: 'flex',
                          flex: 1,
                          margin: '2% 1% 2% 1%',
                        }}
                      >
                        <Typography
                          style={{ padding: '.5%', textAlign: 'center' }}
                        >
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
                      {/* {index === 10 && (
                        <div style={{ flexBasis: '100%', height: 0 }}></div>
                      )}
                      {index === 11 && (
                        <div style={{ flexBasis: '100%', height: 0 }}></div>
                      )} */}
                    </>
                  ))}
                </div>
                }
                {/* </div> */}
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
                      {infoTask?.numVotos}
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
                      Moda
                    </Typography>
                    {infoTask?.moda}
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
                      Média
                    </Typography>
                    {infoTask?.mediaVotosNumericos}
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
                    <ListIcon style={{ width: '20px', height: '20px' }} />
                    <Typography
                      onClick={() => handleFocusItem(1)}
                      style={{
                        fontWeight: 'bold',
                        marginLeft: '5px',
                        fontSize: '13px',
                        alignItems: 'center',
                      }}
                    >
                      Histórias
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
                    <PeopleAltIcon style={{ width: '15px', height: '15px' }} />
                    <Typography
                      onClick={() => handleFocusItem(2)}
                      style={{
                        fontWeight: 'bold',
                        marginLeft: '2px',
                        fontSize: '13px',
                      }}
                    >
                      Usuários
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
                    <ShareIcon style={{ width: '15px', height: '15px' }} />
                    <Typography
                      onClick={() => handleFocusItem(3)}
                      style={{
                        fontWeight: 'bold',
                        marginLeft: '5px',
                        fontSize: '13px',
                      }}
                    >
                      Compartilhar
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
                      {!!FocusItemAddNewStory ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Input
                            placeholder="Nome da história"
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
                          > 
                          <ControlPointIcon
                              style={{ width: '30px', height: '30px' }}
                              // onMouseEnter={() => handleFocusItem(4)} adicionar a lista de historias
                            />
                          </IconButton> 
                      </div>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            marginLeft: '10%',
                          }}
                        >
                          {!checked &&
                          <IconButton
                            color="primary"
                            style={{
                              justifyContent: 'center',
                              width: '10%',
                            }}
                          >
                            <ControlPointIcon
                              style={{ width: '30px', height: '30px' }}
                              onMouseEnter={() => handleFocusItem(4)}
                            />
                          </IconButton>
                          }
                        </div>
                      )}

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
                          Mostrar histórias finalizadas
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
                                Ações
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
                                    task?.id == 1 ?
                                      <FlagIcon
                                        style={{ color: Colors.Green }}
                                      ></FlagIcon>

                                      :

                                      <FlagOutlinedIcon />
                              }
                             
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
                              <HighlightOffIcon
                                style={{ color: Colors.Red }}
                              ></HighlightOffIcon>
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
                        flexDirection: 'row',
                        width: '100%',
                        marginLeft: '10%',
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
                               <StatusVotacao 
                                userId={user.id} 
                              />
                              </Typography>
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
                          Compartilhar sessão
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
                          {CriptoText}
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
