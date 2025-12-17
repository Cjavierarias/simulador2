import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Box, Container, Button, Card, CardContent } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import AssessmentIcon from '@mui/icons-material/Assessment'
import SchoolIcon from '@mui/icons-material/School'

// Componentes simples para empezar
const Calibration = ({ onComplete }: { onComplete: () => void }) => (
  <Container maxWidth="md">
    <Card>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          🔧 Calibración del Simulador
        </Typography>
        <Typography variant="body1" paragraph>
          Bienvenido al simulador de soldadura. Esta aplicación utiliza sensores del dispositivo 
          y cámara para simular técnicas de soldadura MIG, TIG y Electrodo.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Permitirá acceso a cámara y sensores
          • Uso de vibración y sonido para feedback
          • Almacenamiento local de datos
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          fullWidth 
          onClick={onComplete}
          sx={{ mt: 3 }}
        >
          Continuar y Calibrar
        </Button>
      </CardContent>
    </Card>
  </Container>
)

const Simulator = () => (
  <Container maxWidth="lg">
    <Card>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          🔥 Simulador de Soldadura
        </Typography>
        <Typography variant="body1" paragraph align="center">
          ¡Simulador en desarrollo! Esta pantalla mostrará:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
          <Button variant="outlined" startIcon={<PlayArrowIcon />}>
            Iniciar Práctica MIG
          </Button>
          <Button variant="outlined" startIcon={<PlayArrowIcon />}>
            Iniciar Práctica TIG
          </Button>
          <Button variant="outlined" startIcon={<PlayArrowIcon />}>
            Iniciar Práctica Electrodo
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Container>
)

const Results = () => (
  <Container maxWidth="lg">
    <Card>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          📊 Panel de Resultados
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Aquí verás tus estadísticas de práctica, gráficos de progreso y comparaciones.
        </Typography>
      </CardContent>
    </Card>
  </Container>
)

const Certificate = () => (
  <Container maxWidth="lg">
    <Card>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          🎓 Generador de Certificados
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Genera certificados de tus logros en técnicas de soldadura.
        </Typography>
      </CardContent>
    </Card>
  </Container>
)

const App: React.FC = () => {
  const [isCalibrated, setIsCalibrated] = useState(false)

  useEffect(() => {
    const calibrationStatus = localStorage.getItem('welding-sim-calibrated')
    if (calibrationStatus === 'true') {
      setIsCalibrated(true)
    }
  }, [])

  const handleCalibrationComplete = () => {
    setIsCalibrated(true)
    localStorage.setItem('welding-sim-calibrated', 'true')
  }

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" elevation={2}>
          <Toolbar>
            <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              🔥 Welding Simulator PWA
            </Typography>
            <Button color="inherit" component="a" href="#/simulator">
              <PlayArrowIcon sx={{ mr: 1 }} />
              Simular
            </Button>
            <Button color="inherit" component="a" href="#/results">
              <AssessmentIcon sx={{ mr: 1 }} />
              Resultados
            </Button>
            <Button color="inherit" component="a" href="#/certificate">
              <SchoolIcon sx={{ mr: 1 }} />
              Certificados
            </Button>
            <IconButton color="inherit" component="a" href="#/">
              <HomeIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        
        <Box sx={{ mt: 2, p: 2 }}>
          <Routes>
            <Route 
              path="/" 
              element={
                isCalibrated ? <Navigate to="#/simulator" /> : <Calibration onComplete={handleCalibrationComplete} />
              } 
            />
            <Route 
              path="#/simulator" 
              element={
                isCalibrated ? <Simulator /> : <Navigate to="#/" />
              } 
            />
            <Route 
              path="#/results" 
              element={<Results />} 
            />
            <Route 
              path="#/certificate" 
              element={<Certificate />} 
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  )
}

export default App
