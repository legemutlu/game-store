import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StoreService} from "../../store/store.service";
import {Game} from "../../models/game.model";
import {Router} from "@angular/router";
import {SnackbarService} from "../../service/snackbar.service";

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css'],
})
export class GameCreateComponent implements OnInit {
  gameForm: FormGroup;
  public games: Game[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private readonly storeService: StoreService,
    private router: Router,
    private _snackBarService: SnackbarService) {
    this.gameForm = this.createForm();
  }

  ngOnInit(): void {
  }

  createForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      bundle: ['', [Validators.required, Validators.pattern(/^([A-Za-z]{1}[A-Za-z\d_]*\.)+[A-Za-z][A-Za-z\d_]*$/)]],
      owner: ['', [Validators.required, Validators.email]],
      image: ['', Validators.required]
    })
  }

  onFileChange(event: Event) {
    // @ts-ignore
    if (event && event.target && event.target?.files.length > 0) {
      // @ts-ignore
      const file = event.target.files[0];
      this.convertFile(file);
    }
  }

  convertFile(file : File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.gameForm.patchValue({
        image: reader.result
      });
    };
  }

  onSubmit() {
    const newGame: Game = {
      name: this.gameForm.controls['name'].value,
      bundle: this.gameForm.controls['bundle'].value,
      owner: this.gameForm.controls['owner'].value,
      image: this.gameForm.controls['image'].value,
    };
    this.storeService.addGame(newGame);
    this.router.navigate(['/']).then(res => {
      if (res){
        this._snackBarService.openSnackbar();
      }
    });
  }

}
