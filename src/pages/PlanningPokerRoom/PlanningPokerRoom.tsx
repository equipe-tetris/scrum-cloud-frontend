import React, { useState, useCallback, useEffect } from 'react'
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
} from '@mui/material'
import { CopyToClipboard } from "react-copy-to-clipboard";

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

import './PlanningPokerRoom.css'
import { FormatDate } from '../../utils/DateUtil'
import { Colors } from '../../constants/Colors'

import Logo from '../../assets/imagens-projeto/logo-scrumcloud-bg.png'

import { Redirect, useLocation, Route, useHistory } from 'react-router-dom'

import API from '../../config/api'

import { authService } from '../../services/auth.service'
import { teamService } from '../../services/team.service'
import { planningService } from '../../services/planning.service'
import { SalaPlanning } from '../../models/SalaPlanning'
import { border, width } from '@mui/system'

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
  const [NewStory, setNewStory] = React.useState('')

  const CardsList = [
    { index: 0, name: 'Card 1' },
    { index: 1, name: 'Card 2' },
    { index: 2, name: 'Card 3' },
    { index: 3, name: 'Card 4' },
    { index: 4, name: 'Card 5' },
    { index: 5, name: 'Card 6' },
    { index: 6, name: 'Card 7' },
    { index: 7, name: 'Card 8' },
    { index: 8, name: 'Card 9' },
    { index: 9, name: 'Card 10' },
    { index: 10, name: 'Card 11' },
    { index: 11, name: 'Card 12' },
    { index: 12, name: 'Card 13' },
    { index: 13, name: 'Card 14' },
  ]

  const criarSalaPlanning = () => {
    const salaPlanning = {
      nome: nomeSala,
      // scrumMaster: scrumMaster,
      metricaSala: metricaSala,
      equipe: equipe,
    }

    try {
      const res = planningService.cadastrarSalaPlanning(salaPlanning)

      if (res) {
        console.log('Sucess!')
      }

      setNomeSala('')
      setMetricaSala('')
      setEquipe(0)
    } catch (e) {
      console.log(e)
    }
  }

  const handleChange = (event) => {
    setVote('Votação finalizada')
    setColorVote('#F70000')
    setChecked(true)
  }

  var crypto = require('crypto')
  var id = crypto.randomBytes(5).toString('hex')

  function copySomething() {
    try {
      console.log("copiado")
      const toCopy = id;
       navigator.clipboard.writeText(toCopy);
      console.log('Text or Page URL copied');
    }
    catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

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

      // case 3:
      //   // setFocusItemConfig(true)
      //   setFocusItemStory(false)
      //   setFocusItemUsers(false)
      //   setFocusItemShare(false)
      //   break

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

  const buscarEquipesComboBox = async () => {
    try {
      const res = await teamService.buscarEquipesComboBoxPorUsuario(
        userLogged.id,
      )

      setEquipesItemCombo(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  const removeTask = (index: number) => {
    const listAux = [...SessionList]

    listAux.splice(index, 1)

    setSessionList(listAux)
  }

  // useEffect(() => {
  //   console.log(QuantidadeHistoria)
  // }, [QuantidadeHistoria])

  useEffect(() => {
    console.log(FocusItemStory)
  }, [FocusItemStory])

  // useEffect(() => {
  //   console.log(checked)
  // }, [checked])

  useEffect(() => {
    let i = document.getElementById('myInput')

    if (i) i.addEventListener('keydown', handleUserKeyPress)
    return () => {
      if (i) i.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [handleUserKeyPress])

  useEffect(() => {
    buscarEquipesComboBox()
  }, [])

  function ConverterCards() {
    console.log(SessionList)
    if (!!Historias && Historias.length > 0) {
      let a = Historias.split(/\r\n|\r|\n/)
      setSessionList(a)
    }
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
          <div
            style={{
              display: 'flex',
              borderBottom: '2px solid rgba(34,36,38,.15)',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Typography style={{ fontWeight: 'bold', fontFamily: 'Segoe UI' }}>
              Sprint plannig {FormatDate(undefined, 'DD/MM/YYYY')}
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'row', flex: 0.22 }}>
              <Typography
                style={{
                  fontWeight: 'bold',
                  marginRight: '2%',
                  fontFamily: 'Segoe UI',
                }}
              >
                Nome do usuário | Logout{' '}
              </Typography>
              <ExitToAppIcon></ExitToAppIcon>
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
                    marginLeft: '2%',
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
                  Nenhum card selecionado
                  <Card
                    style={{
                      marginTop: '70%',
                      fontFamily: 'Segoe UI',
                      fontWeight: 'bold',
                    }}
                  >
                    Nome do usuário
                  </Card>
                </Card>
                <Divider
                  style={{
                    width: '100%',
                    fontFamily: 'Segoe UI',
                    marginLeft: '2%',
                    fontWeight: 'bold',
                  }}
                >
                  Selecione um card
                </Divider>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '2% 1% 2% 1%',
                    flexWrap: 'wrap',
                    flex: 0,
                  }}
                >
                  {CardsList.map((item, index) => (
                    <>
                      <Card
                        style={{
                          display: 'flex',
                          flex: 1,
                          margin: '2% 1% 2% 1%',
                        }}
                      >
                        <Typography
                          style={{ padding: '.5%', textAlign: 'center' }}
                        >
                          {' '}
                          {item.name}{' '}
                        </Typography>
                      </Card>
                      {index === 1 && (
                        <div style={{ flexBasis: '100%', height: 0 }}></div>
                      )}
                      {index === 3 && (
                        <div style={{ flexBasis: '100%', height: 0 }}></div>
                      )}
                      {index === 5 && (
                        <div style={{ flexBasis: '100%', height: 0 }}></div>
                      )}
                      {index === 7 && (
                        <div style={{ flexBasis: '100%', height: 0 }}></div>
                      )}
                      {index === 9 && (
                        <div style={{ flexBasis: '100%', height: 0 }}></div>
                      )}
                      {index === 11 && (
                        <div style={{ flexBasis: '100%', height: 0 }}></div>
                      )}

                      {/* {index === 3 && (
                      <div style={{ flexBasis: '100%', height: 0 }}></div>
                    )}
                     {index === 7 && (
                      <div style={{ flexBasis: '100%', height: 0 }}></div>
                    )}
                     {index === 11 && (
                      <div style={{ flexBasis: '100%', height: 0 }}></div>
                    )} */}
                    </>
                  ))}
                </div>
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
                      0
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
                      Min
                    </Typography>
                    <MinimizeIcon style={{ color: Colors.Red }} />
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
                      Máx
                    </Typography>
                    <MinimizeIcon style={{ color: Colors.Orange }} />
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
                    <MinimizeIcon style={{ color: Colors.LightBlue }} />
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
                    // justifyContent: 'space-between',
                    margin: '0 20px 5% 3%',
                    flex: 1,
                    border: '1px solid'.concat(Colors.LigthGray),
                    borderTop: 'none',
                    padding: '2%',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {!!FocusItemStory ? (
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        {!!FocusItemAddNewStory && (
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Input
                              value={NewStory}
                              onMouseLeave={() => handleFocusItem(5)}
                              onChange={(e) => setNewStory(e.target.value)}
                              size="small"
                              style={{
                                width: '100%',
                                height: '20px',
                                border: '1px solid'.concat(Colors.LigthGray),
                                padding: '7%',
                              }}
                            ></Input>
                          </div>
                        )}
                        <div onMouseEnter={() => handleFocusItem(4)}>
                          <IconButton
                            color="primary"
                            style={{
                              justifyContent: 'center',
                              width: '10%',
                              marginLeft: '80%',
                            }}
                          >
                            <ControlPointIcon />
                          </IconButton>
                        </div>
                      </div>
                    ) : null}

                    {!!FocusItemUsers && (
                      <p style={{ fontFamily: 'Segoe UI' }}>
                        Aparecer o nome de quem esta logado
                      </p>
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
                            width: '35%',
                            padding: '1%',
                            backgroundColor: Colors.LigthGray,
                          }}
                        >
                          <Typography style={{ fontSize: '14px' }}>
                            Compartilhar sessão
                          </Typography>
                        </div>
                        <div style={{ display: 'flex', width: '35%', justifyContent: 'center'}}>
                          <Typography style={{ fontSize: '14px' }}>
                            {id}
                          </Typography>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            width: '30%',
                            padding: '1%',
                            backgroundColor: Colors.LigthGray,
                            justifyContent: 'center',
                          }}
                        >
                          <ContentCopyIcon onClick={() => copySomething()}/>
                        </div>
                      </Card>
                    )}
                  </div>
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
