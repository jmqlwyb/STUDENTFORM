let payments = [];
let editIndex = -1;

function addPayment() {
  const name = document.getElementById('studentName').value;
  const tuition = document.getElementById('tuitionFee').value;
  const misc = document.getElementById('miscellaneousFee').value;
  const other = document.getElementById('otherFee').value;

  const newPayment = {
    name: name,
    tuition: parseFloat(tuition) || 0,
    misc: parseFloat(misc) || 0,
    other: parseFloat(other) || 0,
  };

  if (editIndex === -1) {
    payments.push(newPayment);
  } else {
    payments[editIndex] = newPayment;
    editIndex = -1;
  }

  document.getElementById('paymentForm').reset();
  document.getElementById('studentName').focus();

  displaySummary();
}

function displaySummary() {
  const summarySection = document.getElementById('summarySection');
  const summaryList = document.getElementById('summaryList');
  const totalAmountSpan = document.getElementById('totalAmount');
  summaryList.innerHTML = '';
  let totalAmount = 0;

  payments.forEach((payment, index) => {
    const li = document.createElement('li');
    li.className = 'summary-item';

    const totalFee = payment.tuition + payment.misc + payment.other;
    totalAmount += totalFee;

    const detailsSpan = document.createElement('span');
    detailsSpan.innerHTML = `
      <br>
      <strong> Student Name:${payment.name}</strong><br>
      <br>
      Tuition Fee: ₱${payment.tuition.toFixed(2)}<br>
      <br>
      Miscellaneous Fee: ₱${payment.misc.toFixed(2)}<br>
      <br>
      Other Fee: ₱${payment.other.toFixed(2)}
      <br>
      
    `;

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';

    const editButton = document.createElement('button');
    editButton.className = 'edit';
    
    editButton.innerText = 'Edit';
    editButton.onclick = () => editPayment(index);
   
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = () => deletePayment(index);

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    li.appendChild(detailsSpan);
    li.appendChild(actionsDiv);
    summaryList.appendChild(li);
  });

  totalAmountSpan.innerText = `₱${totalAmount.toFixed(2)}`;
  summarySection.style.display = payments.length ? 'block' : 'none';
}

function editPayment(index) {
  const payment = payments[index];
  document.getElementById('studentName').value = payment.name;
  document.getElementById('tuitionFee').value = payment.tuition;
  document.getElementById('miscellaneousFee').value = payment.misc;
  document.getElementById('otherFee').value = payment.other;
  editIndex = index;
}

function deletePayment(index) {
  payments.splice(index, 1);
  displaySummary();
}
