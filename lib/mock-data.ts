export type LatLng = [number, number]

export type AmbulanceStatus =
  | 'Available'
  | 'En Route'
  | 'At Patient'
  | 'Transporting'
  | 'Offline'

export type Priority = 'Critical' | 'Serious' | 'Moderate' | 'Stable'

export const CITY_CENTER: LatLng = [12.9716, 77.5946] // Bengaluru

export interface Ambulance {
  id: string
  callSign: string
  status: AmbulanceStatus
  driver: string
  driverPhone: string
  paramedic: string
  location: LatLng
  area: string
  speedKmh: number
  eta: number | null // minutes
  destinationHospitalId: string | null
  patientId: string | null
  priority: Priority | null
  type: 'Advanced Life Support' | 'Basic Life Support' | 'Cardiac'
  equipment: string[]
  fuelPct: number
}

export interface Hospital {
  id: string
  name: string
  type: string
  location: LatLng
  area: string
  distanceKm: number
  eta: number // minutes from active ambulance
  emergencyOpen: boolean
  icuBeds: number
  icuTotal: number
  emergencyBeds: number
  emergencyTotal: number
  generalBeds: number
  oxygen: 'High' | 'Moderate' | 'Low'
  doctorsOnCall: number
  waitMins: number
  readiness: number // 0-100
  specialties: string[]
}

export interface Vitals {
  heartRate: number
  spo2: number
  bpSys: number
  bpDia: number
  respRate: number
  tempC: number
  gcs: number
}

export interface Patient {
  id: string
  caseId: string
  name: string
  age: number
  gender: string
  bloodGroup: string
  emergencyType: string
  priority: Priority
  vitals: Vitals
  vitalsTrend: { t: string; hr: number; spo2: number; bp: number }[]
  allergies: string[]
  conditions: string[]
  medications: string[]
  emergencyContact: { name: string; relation: string; phone: string }
  ambulanceId: string
  hospitalId: string
  photo?: string
  reportedAt: string
}

export interface Requirement {
  label: string
  status: 'Ready' | 'Preparing' | 'Pending' | 'Required'
  note?: string
}

export const ambulances: Ambulance[] = [
  {
    id: 'AMB-07',
    callSign: 'Rescue 07',
    status: 'Transporting',
    driver: 'Ramesh Kulkarni',
    driverPhone: '+91 98450 11207',
    paramedic: 'Sneha Rao',
    location: [12.9611, 77.5885],
    area: 'Richmond Road',
    speedKmh: 46,
    eta: 8,
    destinationHospitalId: 'HOS-1',
    patientId: 'PAT-1042',
    priority: 'Critical',
    type: 'Advanced Life Support',
    equipment: ['Defibrillator', 'Oxygen Cylinder', 'Ventilator', 'ECG Monitor', 'Trauma Kit'],
    fuelPct: 72,
  },
  {
    id: 'AMB-03',
    callSign: 'Rescue 03',
    status: 'Available',
    driver: 'Imran Sheikh',
    driverPhone: '+91 98450 11203',
    paramedic: 'Divya Menon',
    location: [12.9784, 77.6408],
    area: 'Indiranagar',
    speedKmh: 0,
    eta: null,
    destinationHospitalId: null,
    patientId: null,
    priority: null,
    type: 'Cardiac',
    equipment: ['Defibrillator', 'Oxygen Cylinder', 'ECG Monitor', 'Cardiac Meds'],
    fuelPct: 94,
  },
  {
    id: 'AMB-11',
    callSign: 'Rescue 11',
    status: 'En Route',
    driver: 'Anil Gowda',
    driverPhone: '+91 98450 11211',
    paramedic: 'Fatima Khan',
    location: [12.9345, 77.6101],
    area: 'Koramangala',
    speedKmh: 38,
    eta: 5,
    destinationHospitalId: null,
    patientId: 'PAT-2088',
    priority: 'Serious',
    type: 'Basic Life Support',
    equipment: ['Oxygen Cylinder', 'First Aid', 'Spinal Board', 'Splints'],
    fuelPct: 61,
  },
  {
    id: 'AMB-05',
    callSign: 'Rescue 05',
    status: 'At Patient',
    driver: 'Suresh Patil',
    driverPhone: '+91 98450 11205',
    paramedic: 'Nikhil Verma',
    location: [12.9982, 77.5501],
    area: 'Malleshwaram',
    speedKmh: 0,
    eta: 12,
    destinationHospitalId: 'HOS-3',
    patientId: 'PAT-3120',
    priority: 'Moderate',
    type: 'Advanced Life Support',
    equipment: ['Oxygen Cylinder', 'ECG Monitor', 'Trauma Kit', 'IV Kit'],
    fuelPct: 48,
  },
  {
    id: 'AMB-09',
    callSign: 'Rescue 09',
    status: 'Available',
    driver: 'Vijay Naik',
    driverPhone: '+91 98450 11209',
    paramedic: 'Priya Das',
    location: [12.9250, 77.5938],
    area: 'Jayanagar',
    speedKmh: 0,
    eta: null,
    destinationHospitalId: null,
    patientId: null,
    priority: null,
    type: 'Basic Life Support',
    equipment: ['Oxygen Cylinder', 'First Aid', 'Stretcher'],
    fuelPct: 88,
  },
  {
    id: 'AMB-02',
    callSign: 'Rescue 02',
    status: 'Offline',
    driver: 'Karthik Iyer',
    driverPhone: '+91 98450 11202',
    paramedic: '—',
    location: [12.9550, 77.7010],
    area: 'Whitefield Depot',
    speedKmh: 0,
    eta: null,
    destinationHospitalId: null,
    patientId: null,
    priority: null,
    type: 'Advanced Life Support',
    equipment: ['Under Maintenance'],
    fuelPct: 20,
  },
]

export const hospitals: Hospital[] = [
  {
    id: 'HOS-1',
    name: 'Apollo Emergency & Trauma Centre',
    type: 'Multi-specialty · Level 1 Trauma',
    location: [12.9538, 77.5745],
    area: 'Bannerghatta Road',
    distanceKm: 3.2,
    eta: 8,
    emergencyOpen: true,
    icuBeds: 4,
    icuTotal: 20,
    emergencyBeds: 6,
    emergencyTotal: 14,
    generalBeds: 32,
    oxygen: 'High',
    doctorsOnCall: 7,
    waitMins: 5,
    readiness: 92,
    specialties: ['Trauma', 'Cardiology', 'Neurosurgery', 'Orthopedics'],
  },
  {
    id: 'HOS-2',
    name: 'Manipal City Hospital',
    type: 'Multi-specialty · Level 2 Trauma',
    location: [12.9899, 77.5952],
    area: 'Millers Road',
    distanceKm: 5.1,
    eta: 13,
    emergencyOpen: true,
    icuBeds: 2,
    icuTotal: 16,
    emergencyBeds: 3,
    emergencyTotal: 10,
    generalBeds: 18,
    oxygen: 'Moderate',
    doctorsOnCall: 4,
    waitMins: 12,
    readiness: 74,
    specialties: ['Cardiology', 'Pulmonology', 'General Surgery'],
  },
  {
    id: 'HOS-3',
    name: 'Fortis Rapid Care',
    type: 'Emergency & Critical Care',
    location: [12.9345, 77.6270],
    area: 'Koramangala',
    distanceKm: 6.4,
    eta: 16,
    emergencyOpen: true,
    icuBeds: 6,
    icuTotal: 12,
    emergencyBeds: 5,
    emergencyTotal: 8,
    generalBeds: 9,
    oxygen: 'High',
    doctorsOnCall: 5,
    waitMins: 8,
    readiness: 81,
    specialties: ['Critical Care', 'Trauma', 'Nephrology'],
  },
  {
    id: 'HOS-4',
    name: 'St. Johns General Hospital',
    type: 'Government · Multi-specialty',
    location: [12.9279, 77.6205],
    area: 'Sarjapur Road',
    distanceKm: 7.8,
    eta: 19,
    emergencyOpen: true,
    icuBeds: 1,
    icuTotal: 24,
    emergencyBeds: 2,
    emergencyTotal: 16,
    generalBeds: 40,
    oxygen: 'Moderate',
    doctorsOnCall: 6,
    waitMins: 22,
    readiness: 63,
    specialties: ['General Medicine', 'Pediatrics', 'Orthopedics'],
  },
  {
    id: 'HOS-5',
    name: 'Narayana Heart Institute',
    type: 'Cardiac Specialty',
    location: [12.9082, 77.5855],
    area: 'JP Nagar',
    distanceKm: 9.2,
    eta: 24,
    emergencyOpen: false,
    icuBeds: 8,
    icuTotal: 18,
    emergencyBeds: 0,
    emergencyTotal: 6,
    generalBeds: 12,
    oxygen: 'High',
    doctorsOnCall: 3,
    waitMins: 15,
    readiness: 58,
    specialties: ['Cardiology', 'Cardiac Surgery'],
  },
]

export const patients: Patient[] = [
  {
    id: 'PAT-1042',
    caseId: '1042',
    name: 'Aarav Sharma',
    age: 42,
    gender: 'Male',
    bloodGroup: 'O+',
    emergencyType: 'Road Accident (Trauma)',
    priority: 'Critical',
    vitals: { heartRate: 112, spo2: 91, bpSys: 90, bpDia: 60, respRate: 24, tempC: 36.4, gcs: 13 },
    vitalsTrend: [
      { t: '-10m', hr: 98, spo2: 95, bp: 108 },
      { t: '-8m', hr: 104, spo2: 94, bp: 102 },
      { t: '-6m', hr: 108, spo2: 93, bp: 98 },
      { t: '-4m', hr: 110, spo2: 92, bp: 94 },
      { t: '-2m', hr: 112, spo2: 91, bp: 92 },
      { t: 'now', hr: 112, spo2: 91, bp: 90 },
    ],
    allergies: ['Penicillin'],
    conditions: ['Hypertension', 'Type 2 Diabetes'],
    medications: ['Metformin 500mg', 'Amlodipine 5mg'],
    emergencyContact: { name: 'Priya Sharma', relation: 'Spouse', phone: '+91 98860 42042' },
    ambulanceId: 'AMB-07',
    hospitalId: 'HOS-1',
    reportedAt: '14:52',
  },
  {
    id: 'PAT-2088',
    caseId: '2088',
    name: 'Meera Nair',
    age: 29,
    gender: 'Female',
    bloodGroup: 'B+',
    emergencyType: 'Cardiac — Chest Pain',
    priority: 'Serious',
    vitals: { heartRate: 128, spo2: 96, bpSys: 148, bpDia: 96, respRate: 22, tempC: 37.1, gcs: 15 },
    vitalsTrend: [
      { t: '-10m', hr: 118, spo2: 97, bp: 150 },
      { t: '-8m', hr: 122, spo2: 96, bp: 149 },
      { t: '-6m', hr: 124, spo2: 96, bp: 148 },
      { t: '-4m', hr: 126, spo2: 96, bp: 148 },
      { t: '-2m', hr: 127, spo2: 96, bp: 148 },
      { t: 'now', hr: 128, spo2: 96, bp: 148 },
    ],
    allergies: ['None known'],
    conditions: ['Anxiety disorder'],
    medications: ['None'],
    emergencyContact: { name: 'Rohit Nair', relation: 'Brother', phone: '+91 98860 20088' },
    ambulanceId: 'AMB-11',
    hospitalId: 'HOS-2',
    reportedAt: '15:04',
  },
  {
    id: 'PAT-3120',
    caseId: '3120',
    name: 'Ganesh Reddy',
    age: 67,
    gender: 'Male',
    bloodGroup: 'A-',
    emergencyType: 'Stroke — Suspected',
    priority: 'Moderate',
    vitals: { heartRate: 88, spo2: 94, bpSys: 162, bpDia: 98, respRate: 18, tempC: 36.8, gcs: 14 },
    vitalsTrend: [
      { t: '-10m', hr: 84, spo2: 95, bp: 158 },
      { t: '-8m', hr: 85, spo2: 95, bp: 159 },
      { t: '-6m', hr: 86, spo2: 94, bp: 160 },
      { t: '-4m', hr: 87, spo2: 94, bp: 161 },
      { t: '-2m', hr: 88, spo2: 94, bp: 162 },
      { t: 'now', hr: 88, spo2: 94, bp: 162 },
    ],
    allergies: ['Sulfa drugs'],
    conditions: ['Atrial Fibrillation', 'High Cholesterol'],
    medications: ['Warfarin 3mg', 'Atorvastatin 20mg'],
    emergencyContact: { name: 'Lakshmi Reddy', relation: 'Daughter', phone: '+91 98860 31120' },
    ambulanceId: 'AMB-05',
    hospitalId: 'HOS-3',
    reportedAt: '15:11',
  },
]

// Route polyline for the active transporting ambulance (AMB-07 -> HOS-1)
export const activeRoute: LatLng[] = [
  [12.9611, 77.5885],
  [12.9598, 77.5872],
  [12.9576, 77.5845],
  [12.9559, 77.5818],
  [12.9548, 77.5788],
  [12.9541, 77.5762],
  [12.9538, 77.5745],
]

export const trafficSegments: { path: LatLng[]; level: 'clear' | 'moderate' | 'heavy' }[] = [
  { path: [[12.9611, 77.5885], [12.9598, 77.5872], [12.9576, 77.5845]], level: 'clear' },
  { path: [[12.9576, 77.5845], [12.9559, 77.5818], [12.9548, 77.5788]], level: 'heavy' },
  { path: [[12.9548, 77.5788], [12.9541, 77.5762], [12.9538, 77.5745]], level: 'moderate' },
]

export const patientLocation: LatLng = [12.9611, 77.5885]

export const hospitalPrep: Requirement[] = [
  { label: 'Emergency department alerted', status: 'Ready' },
  { label: 'Emergency doctor notified', status: 'Ready' },
  { label: 'Patient information received', status: 'Ready' },
  { label: 'Oxygen support prepared', status: 'Ready' },
  { label: 'Emergency bed reserved', status: 'Ready' },
  { label: 'Blood units (O+) arranged', status: 'Pending', note: '2 units required' },
  { label: 'Trauma team on standby', status: 'Preparing' },
  { label: 'CT scan slot booked', status: 'Preparing' },
]

export const medicalRequirements: {
  medicines: Requirement[]
  equipment: Requirement[]
  critical: { label: string; value: string; status: 'Ready' | 'Pending' | 'Required' }[]
} = {
  medicines: [
    { label: 'IV Normal Saline (0.9%)', status: 'Ready' },
    { label: 'Tranexamic Acid (TXA)', status: 'Required', note: 'Trauma protocol' },
    { label: 'Morphine (analgesia)', status: 'Preparing' },
    { label: 'Adrenaline (emergency)', status: 'Ready' },
    { label: 'Ondansetron (anti-emetic)', status: 'Ready' },
  ],
  equipment: [
    { label: 'Trauma resuscitation bay', status: 'Ready' },
    { label: 'Ventilator', status: 'Ready' },
    { label: 'Portable ultrasound (FAST)', status: 'Preparing' },
    { label: 'Chest drain kit', status: 'Required' },
  ],
  critical: [
    { label: 'Blood Group', value: 'O+ · 2 units', status: 'Pending' },
    { label: 'Oxygen', value: '15 L/min mask', status: 'Ready' },
    { label: 'ICU Bed', value: 'Trauma ICU · Bay 3', status: 'Ready' },
  ],
}

export const aiSummary = {
  headline:
    '42-year-old male involved in a high-impact road traffic accident. Current vitals indicate possible hemodynamic instability with early signs of hypoxia. Immediate trauma evaluation is recommended on arrival.',
  confidence: 88,
  alerts: [
    { level: 'critical' as const, label: 'Low SpO₂ (91%)', detail: 'Below normal range — possible respiratory compromise.' },
    { level: 'critical' as const, label: 'Low BP (90/60)', detail: 'Hypotension — monitor for hemorrhagic shock.' },
    { level: 'warning' as const, label: 'Elevated heart rate (112 BPM)', detail: 'Compensatory tachycardia likely.' },
    { level: 'warning' as const, label: 'GCS 13', detail: 'Mild reduction in consciousness — reassess frequently.' },
  ],
  actions: [
    'Prepare high-flow oxygen support before arrival',
    'Prioritize as trauma resuscitation — activate trauma team',
    'Confirm and cross-match 2 units of O+ blood',
    'Prepare rapid FAST ultrasound for internal bleeding',
    'Establish two large-bore IV lines for fluid resuscitation',
  ],
  questions: [
    'Any loss of consciousness at the scene?',
    'Mechanism of injury — vehicle speed and impact point?',
    'Last oral intake (for possible surgery)?',
    'Current anticoagulant or blood-thinner use?',
  ],
  risks: [
    { label: 'Internal hemorrhage', score: 72 },
    { label: 'Hypoxic injury', score: 54 },
    { label: 'Head / spinal injury', score: 41 },
    { label: 'Cardiac complication', score: 22 },
  ],
}

export const doctors = [
  { id: 'DOC-1', name: 'Dr. Ananya Iyer', role: 'Emergency Medicine Lead', hospital: 'HOS-1', status: 'On Duty', cases: 3 },
  { id: 'DOC-2', name: 'Dr. Vikram Rao', role: 'Trauma Surgeon', hospital: 'HOS-1', status: 'In Prep', cases: 1 },
  { id: 'DOC-3', name: 'Dr. Sara Mathew', role: 'Cardiologist', hospital: 'HOS-2', status: 'On Call', cases: 2 },
  { id: 'DOC-4', name: 'Dr. Rahul Nair', role: 'Critical Care', hospital: 'HOS-3', status: 'On Duty', cases: 4 },
]

export const workflowSteps = [
  { key: 'reported', label: 'Emergency Reported', time: '14:52', done: true },
  { key: 'dispatched', label: 'Ambulance Dispatched', time: '14:53', done: true },
  { key: 'patient-info', label: 'Patient Info Entered', time: '14:55', done: true },
  { key: 'vitals', label: 'Vital Signs Recorded', time: '14:57', done: true },
  { key: 'ai', label: 'AI Preliminary Summary', time: '14:58', done: true },
  { key: 'hospital', label: 'Hospital Notified', time: '14:59', done: true },
  { key: 'doctor', label: 'Doctor Review', time: '15:01', done: true },
  { key: 'prep', label: 'Hospital Preparing', time: '15:02', current: true, done: false },
  { key: 'arrival', label: 'Ambulance Arrival', time: '~15:10', done: false },
  { key: 'treatment', label: 'Treatment Begins', time: '~15:12', done: false },
]

export const postTreatment = {
  diagnosis: 'Blunt abdominal trauma with grade II splenic laceration; mild hypoxia secondary to chest wall contusion.',
  treatment: 'Fluid resuscitation, high-flow oxygen, analgesia, and continuous hemodynamic monitoring. Non-operative management with serial imaging.',
  medicines: ['IV Normal Saline 2L', 'Tranexamic Acid 1g', 'Morphine 4mg IV', 'Ondansetron 4mg IV'],
  procedures: ['FAST ultrasound', 'Contrast CT abdomen/pelvis', 'Central line insertion'],
  condition: 'Stabilized — hemodynamically stable, SpO₂ recovered to 97% on oxygen support.',
  followUp: ['Repeat CT in 24h', 'Surgical review in the morning', 'Serial hemoglobin monitoring'],
  disposition: 'Admitted to Trauma ICU · Bay 3',
}

export function statusColor(status: AmbulanceStatus) {
  switch (status) {
    case 'Available':
      return 'success'
    case 'En Route':
      return 'primary'
    case 'At Patient':
      return 'warning'
    case 'Transporting':
      return 'critical'
    case 'Offline':
      return 'muted'
  }
}

export function priorityColor(p: Priority | null) {
  switch (p) {
    case 'Critical':
      return 'critical'
    case 'Serious':
      return 'warning'
    case 'Moderate':
      return 'primary'
    case 'Stable':
      return 'success'
    default:
      return 'muted'
  }
}
