declare var $;
export class NotificationService {

  // Possible types: ['', 'info', 'success', 'warning', 'danger'];
  static showNotification(type, title, message) {
    $.notify({
      title,
      message
    }, {
      type,
      timer: 4000,
      placement: {
        from: 'top',
        align: 'right'
      },
      template: `<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">
        <button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>
        <i class="material-icons" data-notify="icon">notifications</i>
        <span data-notify="title">{1}</span>
        <span data-notify="message">{2}</span>
      </div>`
    });
  }
}
