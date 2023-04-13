const passSegura =
  /^(?=.+[a-z])(?=.+[A-Z])(?=.+[0-9])(?=.+[$@!_¡?])[A-z\d$@!_¡?]{8,16}$/g;
console.log("_UnaPass_123".match(regExpCBs));
console.log("UnaPass_".match(regExpCBs));
console.log("UnaPass_23".match(regExpCBs));

const mail = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
console.log(mail.test("asd@asd.com"));

const latinos = /^[A-z\u00C0-\u017F\s]+$/g;
console.log(latinos.test("Champigñones"));
console.log(latinos.test("Juan Pérez"));

const hora = /([01]\d|2[0-3]):[0-5]\d/g;
console.log(hora.test("01:59"));
console.log(hora.test("23:08"));

const num = /^-?\d+(\.\d+)?$/g;
console.log(num.test("-1.6"));
console.log(num.test("1.6"));
console.log(num.test("16"));
