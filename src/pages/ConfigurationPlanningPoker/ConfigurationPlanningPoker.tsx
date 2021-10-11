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
} from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import BeenhereIcon from '@mui/icons-material/Beenhere'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import './ConfigurationPlanningPoker.css'

import Logo from '../../assets/imagens-projeto/logo-scrumcloud-bg.png'

import {
  Link,
  Redirect,
  useLocation,
  Route,
  useHistory,
} from 'react-router-dom'

import API from '../../config/api'

import { authService } from '../../services/auth.service'

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

function ConfigurationPlanningPoker() {
  const [QuantidadeHistoria, setQuantidadeHistoria] = React.useState(1)
  const [Historias, setHistorias] = React.useState('')

  const [SessionList, setSessionList] = React.useState([])

  const handleUserKeyPress = useCallback((
    event,
  ) => {
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

  useEffect(() =>
    {
      console.log(QuantidadeHistoria)
    }, [QuantidadeHistoria])

  useEffect(() => {
    let i = document.getElementById('myInput')

    if (i) i.addEventListener('keydown', handleUserKeyPress)
    return () => {
      if (i) i.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [handleUserKeyPress])

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
        <CardContent
          style={{
            flexDirection: 'column',
            minWidth: '80rem',
            display: 'inline-block',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          
            <Typography
              variant="h6"
              style={{
                fontFamily: 'Segoe UI',
                fontSize: 28,
                textAlign: 'center',
              }}
            >
              Configure sua sala de Plannig Poker
            </Typography>
        
            <Card
            style={{
              padding: '1%',
              marginTop: '1%'
            }}
          >
            <Typography
              variant="h6"
              align="left"
              fontFamily="Segoe UI"
              style={{ color: '#20C0C8', fontWeight: 600 }}
            >
              Cadastre seu time
            </Typography>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
              }}
            >
              <Input
                disableUnderline={true}
                placeholder="Nome do time"
                style={{
                  backgroundColor: '#F7F7FC',
                  display: 'flex',
                  flex: 1,
                  marginRight: '1.5%',
                  borderRadius: '4px',
                  padding: '.5%',
                  fontFamily: 'Segoe UI',
                }}
              />
            </div>
          </Card>

          <Card
            style={{ padding: '1%',marginTop: '1%' }}
          >
            <Typography
              variant="h6"
              align="left"
              fontFamily="Segoe UI"
              style={{ color: '#20C0C8', fontWeight: 600 }}
            >
              Escolha a técnica para aplicar no plannig poker
            </Typography>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
              }}
            >
              <Checkbox color="primary" />

              <Typography
                align="center"
                fontFamily="Segoe UI"
                style={{ color: '#707771', fontWeight: 'bold' }}
              >
                Tempo ( 1h, 2h, 4h, 1d, 2d, 3d, 4d, 1sem, ?, Passa, Para )
              </Typography>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
              }}
            >
              <Checkbox color="primary" />

              <Typography
                align="center"
                fontFamily="Segoe UI"
                style={{ color: '#707771', fontWeight: 'bold' }}
              >
                Fibonacci ( 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?, Pass,
                Para)
              </Typography>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
              }}
            >
              <Checkbox color="primary" />

              <Typography
                align="center"
                fontFamily="Segoe UI"
                style={{ color: '#707771', fontWeight: 'bold' }}
              >
                Voto ( Sim, Espera, Não)
              </Typography>
            </div>
          </Card>

          <Card
            style={{
              padding: '1%',
              marginTop: '1%'
            }}
          >
            <Typography
              variant="h6"
              align="left"
              fontFamily="Segoe UI"
              style={{ color: '#20C0C8', fontWeight: 600 }}
            >
              Escolha um nome para o plannig poker
            </Typography>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
              }}
            >
              <Input
                startAdornment={
                  <BeenhereIcon
                    style={{
                      margin: '10px',
                      color: '#707771',
                      fontFamily: 'Segoe UI',
                    }}
                  ></BeenhereIcon>
                }
                disableUnderline={true}
                placeholder="Task"
                style={{
                  backgroundColor: '#F7F7FC',
                  display: 'flex',
                  flex: 1,
                  marginRight: '1.5%',
                  borderRadius: '4px',
                  fontFamily: 'Segoe UI',
                }}
              />
            </div>
          </Card>

          <Card
            style={{
              padding: '1%',
              marginTop: '1%'
            }}
          >
            <Typography
              variant="h6"
              align="left"
              fontFamily="Segoe UI"
              style={{ color: '#20C0C8', fontWeight: 600 }}
            >
              Crie as listas do plannig poker
            </Typography>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
              }}
            >
              <Input
                //startAdornment={ <Beenhere position="start" style={ { margin: '10px', color: Colors.LightGray } }></Beenhere> }
                disableUnderline={true}
                id="myInput"
                multiline={true}
                rows={QuantidadeHistoria}
                onChange={(e) => {
                  setHistorias(e.target.value)
                }} // fazer uma funcao que
                placeholder="Digite uma história em cada linha e depois click no botão para converter"
                style={{
                  backgroundColor: '#F7F7FC',
                  display: 'flex',
                  flex: 1,
                  marginRight: '1.5%',
                  borderRadius: '4px',
                  padding: '2%',
                  fontFamily: 'Segoe UI',
                }}
              />
            </div>

            <div style={{display: 'flex', justifyContent: 'right'}}>

            <Button
              //disabled={ DisableButton }
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<SwapHorizIcon></SwapHorizIcon>}
              style={{
                marginTop: '1%',
                marginBottom: '1%',
                display: 'flex',
                border: '1px solid',
                borderColor: '#0d6efd',
                backgroundColor: '#fff',
                color: '#0d6efd',
                fontFamily: 'Segoe UI',
                textTransform: 'none',
                boxShadow: 'none',
                fontSize: '20px',
                width: '30%',
              }}
              onClick={() => ConverterCards()}
            >
              Converter em cards{' '}
            </Button>

            </div>

            {SessionList.length > 0 &&
              SessionList.map((item, index) => {
                return (
                  <Card
                    key={index}
                    style={{
                      marginBottom: '1%',
                      display: 'flex',
                      padding: '.5%',
                    }}
                  >
                    <Typography
                      align="left"
                      fontFamily="Segoe UI"
                      style={{
                        color: '#B8B9B9',
                        fontWeight: 600,
                        marginLeft: '1%',
                      }}
                    >
                      {item}
                    </Typography>

                    <HighlightOffIcon
                      style={{ marginLeft: '5%' }}
                    ></HighlightOffIcon>
                  </Card>
                )
              })}
          </Card>
        </CardContent>
        <CardActions></CardActions>
      </div>
    </div>
  )
}

export default ConfigurationPlanningPoker
