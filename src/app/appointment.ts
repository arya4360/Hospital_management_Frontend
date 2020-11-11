
import {AppointmentPatient} from './appointmentPatient';
import {AppointmentDoctor} from './appointmentDoctor';

export class Appointment{
  constructor(
    public description: string,
    public patient: AppointmentPatient,
    public doctor: AppointmentDoctor,
    public date: Date
  ) {
  }
}
