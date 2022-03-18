import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;
  nombre: string;
  password: string;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {
    this.formularioLogin = this.fb.group({
      nombre: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  async ingresar() {
    console.log('Botón activado');
    const f = this.formularioLogin.value;
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(usuario);
    console.log(f);


    if (usuario.nombre == f.nombre && usuario.password == f.password) {
      //si los datos existen, generamos en el localstorage el inicio de sesión
      console.log('Ingresado');
      const session ={
        usuario: f.nombre,
        //obtenemos la fecha actual
        fecha: new Date()
      };

      localStorage.setItem('current_session', JSON.stringify(session));
      //como sí hay un registro, vamos a inicio
      this.navCtrl.navigateRoot('/inicio');
      const alert = await this.alertController.create({
        header: 'Acceso Correcto',
        message: 'Bienvenido, ' + f.nombre,
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }
  }
}
