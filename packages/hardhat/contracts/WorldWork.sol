//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { ByteHasher } from "./helpers/ByteHasher.sol";
import { IWorldID } from "./interfaces/IWorldID.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WorldWork {
	enum Stage {
		Live,
		Completed
	}

	struct Job {
		address employer;
		Salary stablecoinSalary;
		Salary tokenSalary;
		Stage stage;
		address worker;
		address[] applicants;
	}

	struct Salary {
		uint amount;
		IERC20 token;
	}

	mapping(address => bool) public workers;
	mapping(address => bool) public employers;
	mapping(address => Job[]) public jobs;

	// mapping(string => VisitDetails) public visitdetails;

	// mapping(address => mapping(address => bool)) public doctorsPermissions;

	using ByteHasher for bytes;

	///////////////////////////////////////////////////////////////////////////////
	///                                  ERRORS                                ///
	//////////////////////////////////////////////////////////////////////////////

	/// @notice Thrown when attempting to reuse a nullifier
	error InvalidNullifier();

	/// @dev The World ID instance that will be used for verifying proofs
	IWorldID internal immutable worldId;

	/// @dev The contract's external nullifier hash
	uint256 internal immutable externalNullifier;

	/// @dev The World ID group ID (always 1)
	uint256 internal immutable groupId = 1;

	/// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
	mapping(uint256 => bool) internal nullifierHashes;

	event EmployerRegistered(address indexed employer);
	event WorkerRegistered(address indexed patient);
	// event VisitFinalized(
	// 	address indexed patient,
	// 	address indexed doctor,
	// 	string visitCid,
	// 	uint price
	// );
	// event TransactionPaid(string visitCid);

	/// @param _worldId The WorldID instance that will verify the proofs
	/// @param _appId The World ID app ID
	/// @param _actionId The World ID action ID
	constructor(
		IWorldID _worldId,
		string memory _appId,
		string memory _actionId
	) {
		worldId = _worldId;
		externalNullifier = abi
			.encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
			.hashToField();
	}

	/// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
	/// @param root The root of the Merkle tree (returned by the JS widget).
	/// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
	/// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
	/// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
	function registerWorker(
		address signal,
		uint256 root,
		uint256 nullifierHash,
		uint256[8] calldata proof
	) public {
		// First, we make sure this person hasn't done this before
		if (nullifierHashes[nullifierHash]) revert InvalidNullifier();
		require(!workers[signal], "Worker already registered");
		require(!employers[signal], "Employer already registered");

		// We now verify the provided proof is valid and the user is verified by World ID
		worldId.verifyProof(
			root,
			groupId,
			abi.encodePacked(signal).hashToField(),
			nullifierHash,
			externalNullifier,
			proof
		);

		// We now record the user has done this, so they can't do it again (proof of uniqueness)
		nullifierHashes[nullifierHash] = true;

		workers[signal] = true;

		emit WorkerRegistered(signal);

		// Finally, execute your logic here, for example issue a token, NFT, etc...
		// Make sure to emit some kind of event afterwards!
	}

	// function registerPatient() public {
	//     patients.push(msg.sender);
	// }

	/// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
	/// @param root The root of the Merkle tree (returned by the JS widget).
	/// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
	/// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
	/// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
	function registerEmployer(
		address signal,
		uint256 root,
		uint256 nullifierHash,
		uint256[8] calldata proof
	) public {
		// First, we make sure this person hasn't done this before
		if (nullifierHashes[nullifierHash]) revert InvalidNullifier();
		require(!workers[signal], "Worker already registered");
		require(!employers[signal], "Employer already registered");
		// We now verify the provided proof is valid and the user is verified by World ID
		worldId.verifyProof(
			root,
			groupId,
			abi.encodePacked(signal).hashToField(),
			nullifierHash,
			externalNullifier,
			proof
		);

		// We now record the user has done this, so they can't do it again (proof of uniqueness)
		nullifierHashes[nullifierHash] = true;

		employers[signal] = true;

		emit EmployerRegistered(signal);
	}

	function addJobOffer(uint stablecoinSalary, uint tokenSalary) public {
		require(employers[msg.sender], "Only employers can add job offers");
		jobs[msg.sender].push(
			Job(
				msg.sender,
				Salary(stablecoinSalary, IERC20(address(0))),
				Salary(tokenSalary, IERC20(address(0))),
				Stage.Live,
				address(0),
				new address[](0)
			)
		);
	}

	function applyForJob(address employer, uint index) public {
		require(workers[msg.sender], "Only workers can apply for jobs");
		require(
			employers[employer],
			"Only employers can have job applications"
		);
		jobs[employer][index].applicants.push(msg.sender);
	}

	function acceptWorker(address worker, uint index) public {
		require(employers[msg.sender], "Only employers can accept workers");
		require(workers[worker], "Only workers can be accepted");
		jobs[msg.sender][index].worker = worker;
	}

	function deactivateJob(uint index) public {
		require(employers[msg.sender], "Only employers can complete jobs");
		jobs[msg.sender][index].stage = Stage.Completed;
	}

	function addDefaultValuesEmployer(address adr) public {
		employers[adr] = true;
	}

	function addDefaultValuesWorker(address adr) public {
		workers[adr] = true;
	}

	function addDefaultJobOffer(address employer) public {
		jobs[employer].push(
			Job(
				employer,
				Salary(100, IERC20(address(0))),
				Salary(100, IERC20(address(0))),
				Stage.Live,
				address(0),
				new address[](0)
			)
		);
	}

		function addDefaultJobOfferWithWorker(address employer, address worker) public {
		jobs[employer].push(
			Job(
				employer,
				Salary(100, IERC20(address(0))),
				Salary(100, IERC20(address(0))),
				Stage.Live,
				worker,
				new address[](0)
			)
		);
	}

	function testApplyForJob(address employer, uint index, address testAddress) public {
		jobs[employer][index].applicants.push(testAddress);
	}

	function getJobs(address employer) public view returns (Job[] memory) {
		return jobs[employer];
	}

	function getJobApplicants(address employer, uint index)
		public
		view
		returns (address[] memory)
	{
		return jobs[employer][index].applicants;
	}

	// function finalizeVisit(
	// 	address patient,
	// 	address doctor,
	// 	string calldata visitCid,
	// 	uint price
	// ) public {
	// 	require(doctors[doctor], "Only doctors can add documents");
	// 	require(patients[patient], "Only patients can have documents");
	//     require(doctorsPermissions[doctor][patient], "Doctor does not have permission to access patient's profile");
	// 	visitdetails[visitCid] = VisitDetails(price, false, doctor, patient);
	// 	emit VisitFinalized(patient, doctor, visitCid, price);
	// }

	// function shareProfile(address doctor) public {
	// 	require(doctors[doctor], "Only doctors can be shared with");
	// 	require(patients[msg.sender], "Only patients can share their profile");
	// 	doctorsPermissions[doctor][msg.sender] = true;
	// }

	// function revokeProfile(address doctor) public {
	// 	require(doctors[doctor], "Only doctors can be shared with");
	// 	require(patients[msg.sender], "Only patients can share their profile");
	// 	doctorsPermissions[doctor][msg.sender] = false;
	// }

	// function payForVisit(string calldata visitCid) public payable {
	// 	require(patients[msg.sender], "Only patients can pay for visits");
	// 	require(
	// 		visitdetails[visitCid].patient == msg.sender,
	// 		"Only the patient can pay for the visit"
	// 	);
	// 	require(
	// 		visitdetails[visitCid].paid == false,
	// 		"The visit has already been paid for"
	// 	);
	// 	require(visitdetails[visitCid].price == msg.value, "Bad value");
	// 	// Transfer the payment to the doctor
	// 	payable(visitdetails[visitCid].doctor).transfer(msg.value);
	// 	// Mark the visit as paid
	// 	visitdetails[visitCid].paid = true;
	// 	revokeProfile(visitdetails[visitCid].doctor);
	// 	emit TransactionPaid(visitCid);
	// }
}
